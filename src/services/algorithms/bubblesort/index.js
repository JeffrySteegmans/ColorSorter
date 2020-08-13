import { Swap } from '../sortHelpers';

export const BubbleSort = function (array){
  let output = [...array];
  let isSorted = false;
  let counter = 0;

  while (!isSorted) {
    isSorted = true;
    for(let i = 0; i < output.length - 1 - counter; i++) {
      if (output[i].toHsl().h > output[i + 1].toHsl().h) {
        Swap(i, i + 1, output);
        isSorted = false;
      }
    }
    counter++;
  }

  return output;
}
export default BubbleSort;
