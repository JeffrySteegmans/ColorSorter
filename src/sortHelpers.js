function Swap(i, j, array){
  let buffer = array[i];
  array[i] = array[j];
  array[j] = buffer;
}