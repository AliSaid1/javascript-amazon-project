export function formatCurrency(priceCents) {
  return (priceCents/100).toFixed(2);
}


//default to call it back without {} ex: import formatCurrency from ......;
//each file can ONLY HAVE 1 default export
//export default formatCurrency;