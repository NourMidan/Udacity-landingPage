//Global variables
let navSections = [];
let listItems = [];
const ul = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
//tranforming the nodeList into Array to be able to map over it later
const sectionsArray = [...sections];

// isInViewport is a function checks if a specific element is in the viewport and it return true or false
let isInViewport = function (elem) {
  let distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
//this function adds or removes classname based on if the section in viewport or not
let addRemoveClass = (section, index) => {
  if (isInViewport(section)) {
    section.classList.add("active");
    listItems[index].classList.add("activeListItem");
    sectionsArray.forEach((section_, i) => {
      if (i !== index) {
        section_.classList.remove("active");
        listItems[i].classList.remove("activeListItem");
      }
    });
  }
};
//looping over all the section to addEventListener 'scroll'
sectionsArray.forEach((section, index) => {
  window.addEventListener(
    "scroll",
    () => addRemoveClass(section, index),
    false
  );
});

const navSectionsChecker = () => {
  //here iam looping over all the sections to get each section's title from the data-nav attribute
  let tempArray = [];
  sectionsArray.forEach((section) => {
    tempArray.push(section.getAttribute("data-nav"));
  });
  navSections = [...tempArray];
  // here iam creating the nav's list items & anchors and giving passing them the title i got from the data-nav attribute
  navSections.forEach((navSection) => {
    let anchor = document.createElement("a");
    anchor.innerText = navSection;
    anchor.classList.add("menu__link");
    let listItem = document.createElement("li");
    listItem.appendChild(anchor);
    ul.appendChild(listItem);
  });
  //here iam adding a click eventListner to the nav's anchors and each one scrolls to the appropriate section
  listItems = [...document.querySelectorAll("li")];
  listItems.forEach((listItem, index) => {
    listItem.firstElementChild.addEventListener("click", () => {
      sections[index].scrollIntoView();
    });
  });
};
navSectionsChecker();
