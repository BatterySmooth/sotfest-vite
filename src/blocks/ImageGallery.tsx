import { useEffect, useRef, useState } from 'react';
import { Config } from '@core/Config';
import { supabase } from '@core/SupabaseClient';
import { Section } from '@/components/Section';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './ImageGallery.module.css';

type Image = {
  name: string;
  url: string;
};

type YearGroup = {
  year: string;
  images: Image[];
};

const getYears = async (): Promise<string[]> => {
  const { data, error } = await supabase.storage
    .from(Config.BucketName)
    .list("");
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? [])
    .filter((item) => item.metadata === null) // folders only
    .filter((item) => !item.name.startsWith(".")) // ignore placeholder
    .map((item) => item.name)
    .sort((a, b) => Number(b) - Number(a)); // newest first
};

const getImagesForYear = async (year: string) => {
  const { data, error } = await supabase.storage
    .from(Config.BucketName)
    .list(year, {
      offset: 0,
    });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? [])
    .filter((file) => !file.name.startsWith(".")) // placecholder
    .filter((file) => file.metadata !== null) // folders
    .filter((file) => file.name.endsWith(".svg"))
    .map((file) => {
      const { data: urlData } = supabase.storage
        .from(Config.BucketName)
        .getPublicUrl(`${year}/${file.name}`);
      return {
        name: file.name,
        url: urlData.publicUrl,
      };
    });
}

export const ImageGallery: React.FC = () => {
  const [yearGroups, setYearGroups] = useState<YearGroup[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [loadedYears, setLoadedYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const loadingYearsRef = useRef<Set<string>>(new Set());

  const loadYear = async (year: string) => {
    if (loadingYearsRef.current.has(year)) return;
    loadingYearsRef.current.add(year);
    if (loadedYears.includes(year)) return;
    setLoading(true);
    const imgs = await getImagesForYear(year);
    setYearGroups((prev) => {
      if (prev.some((g) => g.year === year)) return prev;
      return [...prev, { year, images: imgs }];
    });
    setLoadedYears((prev) => [...prev, year]);
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const y = await getYears();
      setYears(y);
      if (y.length > 0) {
        loadYear(y[0]); // load latest year first
      }
    };
    init();
  }, []);

  // scroll observer
  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const nextIndex = loadedYears.length;
        const nextYear = years[nextIndex];
        if (nextYear) {
          loadYear(nextYear);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [years, loadedYears]);

  return (
    <>
      {yearGroups.map((group) => (
        <Section key={group.year}>
          <SectionHeader text={`Logbook ${group.year}`} />
          <div className={styles.root}>
            {group.images.map((img) => (
              <div key={img.name} className={styles.item}>
                <img src={img.url} alt={img.name} loading="lazy" />
              </div>
            ))}
          </div>
        </Section>
      ))}
      {/* scroll trigger */}
      {loading && (
        <Section>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading more logbook entries...</p>
          </div>
        </Section>
      )}
      <div ref={loaderRef} style={{ height: 50 }} />
    </>
  );
}