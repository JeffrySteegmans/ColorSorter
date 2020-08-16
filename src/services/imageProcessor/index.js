import tinycolor from 'tinycolor2';

function ConvertImageToColorArray(image) {
  let colorArray = [];
  for(let i = 0; i < image.length; i += 4){
    let color = "rgba (" + image[i] + ", " + image[i + 1] + ", " + image[i + 2] + ", " + image[i + 3] + ")";
    colorArray.push(tinycolor(color));
  }
  return colorArray;
}

export default ConvertImageToColorArray;