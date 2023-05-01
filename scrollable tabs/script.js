const tabs = document.querySelectorAll(".scrollable-tabs-container a");
const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");
const rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg");
const tabsList = document.querySelector(".scrollable-tabs-container ul");
const leftArrowContainer = document.querySelector(".scrollable-tabs-container .left-arrow");
const rightArrowContainer = document.querySelector(".scrollable-tabs-container .right-arrow");

const removeAllActiveClasses = () => {
  tabs.forEach(tab => {
    tab.classList.remove("active");
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    removeAllActiveClasses();
    tab.classList.add("active");
  });
});

rightArrow.addEventListener("click", () => {
  tabsList.scrollLeft += 200;
});

const manageIcons = () => {
  if (tabsList.scrollLeft >= 20) {
    leftArrowContainer.classList.add("active");
  } else {
    leftArrowContainer.classList.remove("active");
  }

  let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;

  // try add more item in list and view value change
  // console.log(tabsList.scrollWidth, tabsList.clientWidth);

  if (tabsList.scrollLeft >= maxScrollValue) {
    rightArrowContainer.classList.remove("active");
  } else {
    rightArrowContainer.classList.add("active");
  }
}

rightArrow.addEventListener("click", () => {
  tabsList.scrollLeft += 200;
  manageIcons();
});

leftArrow.addEventListener("click", () => {
  tabsList.scrollLeft -= 200;
  manageIcons();
});

tabsList.addEventListener("scroll", manageIcons);

manageIcons();