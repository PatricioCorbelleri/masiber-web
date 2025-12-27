export const formatUSD = (value) => {
  if (value === null || value === undefined || value === "")
    return "Consultar";

  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return "Consultar";

  return num.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
