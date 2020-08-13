import { Swap } from './sortHelpers';

export const SelectionSort = function (array) {
  let currentIdx = 0;

  while (currentIdx < array.length){
    let smallestIdx = currentIdx;
    for (let i = currentIdx + 1; i < array.length; i++){
      if (array[smallestIdx].toHsl().h > array[i].toHsl().h){
        smallestIdx = i;
      }
    }
    Swap(currentIdx, smallestIdx, array);
    currentIdx++;
  }

  return array;
}
export default SelectionSort;
