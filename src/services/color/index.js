import tinycolor from 'tinycolor2';

function generateListOfRandomColors(count) {
  let colors = [];
  for (let i = 0; i < count; i++){
    colors.push(tinycolor.random());
  }
  return colors;
}

export default generateListOfRandomColors;