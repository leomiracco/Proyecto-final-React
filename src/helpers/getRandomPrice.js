export const getRandomPrice = ()=>{
  const min = 950;
  const max = 3750;
  return Math.ceil(Math.random() * (max - min) + min);
};