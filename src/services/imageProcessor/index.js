import tinycolor from 'tinycolor2';

export function ConvertImageToColorArray(image) {
  let colorArray = [];
  for(let i = 0; i < image.length; i += 4){
    let color = "rgba (" + image[i] + ", " + image[i + 1] + ", " + image[i + 2] + ", " + image[i + 3] + ")";
    colorArray.push(tinycolor(color));
  }
  return colorArray;
}

export function GetResizedImageDimensions(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  if (width > maxWidth) {
    let ratio = maxWidth / width;
    width = maxWidth;
    height = img.height * ratio;
  }
  if (height > maxHeight) {
    let ratio = maxHeight / height;
    height = maxHeight;
    width = width * ratio;
  }

  return {
    width: width,
    height: height
  }
}

export function GetCanvasData(img, width, height) {
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height).data;
}

export default {
  ConvertImageToColorArray,
  GetResizedImageDimensions,
  GetCanvasData
};