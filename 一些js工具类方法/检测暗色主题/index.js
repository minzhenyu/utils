const isDarkMode = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

console.log(isDarkMode())// false
