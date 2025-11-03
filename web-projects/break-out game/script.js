// get elements
const showBtn = document.getElementById("show-button");
const closeBtn = document.getElementById("close-button");
const rules = document.getElementById("rules");
console.log(rules);

// controll rules page
showBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
