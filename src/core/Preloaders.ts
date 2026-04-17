export const preloadImage = (src: string, srcSet?: string, sizes?: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    img.src = src;
    img.onload = async () => {
      try {
        await img.decode?.();
      } catch {}
      resolve();
    };
    img.onerror = () => resolve();
  });
}