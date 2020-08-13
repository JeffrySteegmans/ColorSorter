import { Swap } from '../sortHelpers';

export const SelectionSort = function (array) {
  let output = [...array];
  let currentIdx = 0;

  while (currentIdx < output.length){
    let smallestIdx = currentIdx;
    for (let i = currentIdx + 1; i < output.length; i++){
      if (output[smallestIdx].toHsl().h > output[i].toHsl().h){
        smallestIdx = i;
      }
    }
    Swap(currentIdx, smallestIdx, output);
    currentIdx++;
  }

  return output;
}
export default SelectionSort;
