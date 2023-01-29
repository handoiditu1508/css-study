const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".slider .progress");
const priceInput = document.querySelectorAll(".price-input input");
const priceGap = 1000;

rangeInput.forEach(input => {
  input.addEventListener("input", e => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        minVal = maxVal - priceGap;
        rangeInput[0].value = minVal;
      } else {
        maxVal = minVal + priceGap;
        rangeInput[1].value = maxVal;
      }
    }
    priceInput[0].value = minVal;
    priceInput[1].value = maxVal;
    progress.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
    progress.style.right = `${100 - (maxVal / rangeInput[0].max) * 100}%`;
  });
});

priceInput.forEach(input => {
  input.addEventListener("input", e => {
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= priceGap) {
      if (e.target.className === "input-min") {
        if (minVal >= priceInput[0].min) {
          rangeInput[0].value = minVal;
          progress.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
        }
      } else if (maxVal <= priceInput[1].max) {
        rangeInput[1].value = maxVal;
        progress.style.right = `${100 - (maxVal / rangeInput[0].max) * 100}%`;
      }
    }
  });
});

priceInput[0].addEventListener("blur", e => {
  let minVal = parseInt(priceInput[0].value);

  if (minVal < priceInput[0].min) {
    minVal = priceInput[0].min;
    priceInput[0].value = minVal;
    rangeInput[0].value = minVal;
    progress.style.left = `${(minVal / rangeInput[0].max) * 100}%`;
  }
});

priceInput[1].addEventListener("blur", e => {
  let maxVal = parseInt(priceInput[1].value);

  if (maxVal > priceInput[1].max) {
    maxVal = priceInput[1].max;
    priceInput[1].value = maxVal;
    rangeInput[1].value = maxVal;
    progress.style.right = `${100 - (maxVal / rangeInput[0].max) * 100}%`;
  }
});