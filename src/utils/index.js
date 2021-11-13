export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 100;
export const loaderDelay = 2000;

export const clamp = (value, min, max) => (value < min ? min : value > max ? max : value);

export const scale = (num, outMin, outMax) => (num - 0) * (outMax - outMin) + outMin;

export function getOffsetTop(element) {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
