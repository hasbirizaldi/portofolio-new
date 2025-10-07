export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Helper untuk ubah format tanggal jadi "12 Jan 2023"
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatFullDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  // Ambil tanggal lokal, bukan UTC
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatMonthYear = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};
