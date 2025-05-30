export const highlightMatch = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<strong>$1</strong>");
};

export const formatClassName = (classNum) => {
  return `Class ${classNum}`;
};
