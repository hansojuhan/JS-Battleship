/**
 * Takes an imported image and attaches it to the <head> as a favicon.
 * 
 * @param {image file} image - link to the image file in the source files.
 * @param {string} innerText - text to be added into the innerText of the icon.
 */
export function loadFavicon(image, innerText) {
  // Load favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href= image;
  favicon.type = 'image/x-icon'
  favicon.innerText = innerText;
  const head = document.querySelector('head');
  head.append(favicon);
}
