export function handleArrayCompare(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }

    const stringArray1 = array1.map((user)=>user._id);
    const stringArray2 = array2.map((user)=>user._id);
    
  return stringArray1.every((element) => stringArray2.includes(element));
}