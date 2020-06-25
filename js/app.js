/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll("section[data-nav]");
const navbarList = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const thresholdVal = 0.6;
function sectionObserverCallback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= thresholdVal) {
      if (!entry.target.classList.contains("active")) {
        entry.target.classList.add("active");
      }
    } else {
      if (entry.target.classList.contains("active")) {
        entry.target.classList.remove("active");
      }
    }
  });
}
const sectionObserver = new IntersectionObserver(sectionObserverCallback, {
  root: null, // use the document's viewport as the container
  threshold: thresholdVal,
});

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

for (const section of sections) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "menu__link";
  a.textContent = section.querySelector("h2").textContent;
  a.href = "#" + section.id;
  li.appendChild(a);
  fragment.appendChild(li);

  // section is in viewport observer
  sectionObserver.observe(section);
}
navbarList.appendChild(fragment);
