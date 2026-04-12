import { useEffect, useState } from 'react';
import { Config } from '@core/Config';
import { supabase } from '@core/SupabaseClient';
import styles from './ImageGallery.module.css';

type Image = {
  name: string;
  url: string;
};

let cachedImages: Image[] | null = null;

const getImages = async () => {
  const { data, error } = await supabase.storage
    .from(Config.BucketName)
    .list("", {
      // limit: 100,
      offset: 0,
    });
  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? [])
    // remove placeholder + hidden files
    .filter((file) => !file.name.startsWith("."))
    // remove folders (they have no metadata size)
    .filter((file) => file.metadata !== null)
    .map((file) => {
      const { data: urlData } = supabase.storage
        .from(Config.BucketName)
        .getPublicUrl(file.name);
      return {
        name: file.name,
        url: urlData.publicUrl,
      };
    });
}

export const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function load() {
      const imgs = await getImages();
      setImages(imgs);
    }
    if (cachedImages){
      setImages(cachedImages);
    }
    else {
      load();
    }
  }, []);

  return (
    <div className={styles.root}>
      {images.map((img) => (
        <div key={img.name} className={styles.item}>
          <img src={img.url} alt={img.name} />
        </div>
      ))}
    </div>
  );
}