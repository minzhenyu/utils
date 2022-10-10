const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" });

const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });
export { scrollToTop, scrollToBottom };
