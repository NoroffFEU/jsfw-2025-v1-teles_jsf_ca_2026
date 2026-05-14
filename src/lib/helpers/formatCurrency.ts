const roundMaxDecimals = (value: number): number => {
  return +value.toFixed(2);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: "NOK",
    style: "currency",
  }).format(roundMaxDecimals(value));
};
