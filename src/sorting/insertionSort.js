import { Swap } from './sortHelpers';

export const InsertionSort = function (array){
  for (let i = 1; i < array.length; i++){
    let j = i;
    while (j > 0 && array[j].toHsl().h < array[j - 1].toHsl().h){
      Swap(j, j - 1, array);
      j--;
    }
  }

  return array;
}
export default InsertionSort;
