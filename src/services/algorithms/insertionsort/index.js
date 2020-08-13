import { Swap } from '../sortHelpers';

export const InsertionSort = function (array){
  let output = [...array];
  for (let i = 1; i < output.length; i++){
    let j = i;
    while (j > 0 && output[j].toHsl().h < output[j - 1].toHsl().h){
      Swap(j, j - 1, output);
      j--;
    }
  }

  return output;
}
export default InsertionSort;
