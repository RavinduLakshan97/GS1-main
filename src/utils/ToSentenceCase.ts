const ToSentenceCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

export default ToSentenceCase;
