export const currencyFormator = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});
