const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // `entry.target` is the dom element
      console.log(`${entry.target.id} is visible`);
    }
  });
};

const options = {
  threshold: 1.0,
};
const observer = new IntersectionObserver(callback, options);
const btn = document.getElementById("btn");
const bottomBtn = document.getElementById("bottom-btn");
observer.observe(btn);
observer.observe(bottomBtn);
