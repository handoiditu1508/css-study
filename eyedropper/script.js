const imageInput = document.querySelector("#image-select");
const imagePreview = document.querySelector(".preview");

if (!window.EyeDropper) {
  alert("Browser not supported!");
}

const eyedropper = new EyeDropper();

const pickerBtn = document.querySelector(".open-picker");
const result = document.querySelector(".res");

imageInput.addEventListener("change", function () {
  imagePreview.classList.add("active");
  const file = this.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    imagePreview.src = this.result;
  });
  reader.readAsDataURL(file);
});

pickerBtn.addEventListener("click", function () {
  result.classList.add("show");
  eyedropper.open()
    .then(res => {
      result.innerHTML = `Picked Color: <b>${res.sRGBHex}</b>`;
    })
    .catch(err => {
      console.log("User canceled the Selection");
    })
})