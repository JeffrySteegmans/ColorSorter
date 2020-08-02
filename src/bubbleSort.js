function BubbleSort(array){
  let isSorted = false;
  let counter = 0;

  while (!isSorted) {
    isSorted = true;
    for(let i = 0; i < array.length - 1 - counter; i++) {
      if (array[i].toHsl().h > array[i + 1].toHsl().h) {
        Swap(i, i + 1, array);
        isSorted = false;
      }
    }
    counter++;
  }

  return array;
}