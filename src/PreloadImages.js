export default function preloadImages(srcs) {
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = img.onabort = () => reject(src);
      img.src = src;
    });
  };

  const promises = srcs.map((src) => loadImage(src));
  return Promise.all(promises);
}
