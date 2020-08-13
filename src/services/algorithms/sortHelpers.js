export const Swap = function (i, j, array){
  let buffer = array[i];
  array[i] = array[j];
  array[j] = buffer;
}
export default Swap;
