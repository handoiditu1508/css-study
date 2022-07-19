const form = document.querySelector("form");
const fileInput = form.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area ul");
const uploadedArea = document.querySelector(".uploaded-area ul");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    const { name, size } = file;
    uploadFile(name, size);
  }
}

/**
 * Upload file.
 * @param {string} name File name.
 * @param {number} size File size in bytes.
 */
function uploadFile(name, size) {
  const updateProgressFunction = (current, max) => {
    name = shortenFileName(name);
    let currentPercent = 100 / max * current;

    let progressHTML = `<li class="row">
                          <i class="fa-solid fa-file-lines"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} * Uploading</span>
                              <span class="percent">${currentPercent}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${currentPercent}%"></div>
                            </div>
                          </div>
                        </li>`;
    progressArea.innerHTML = progressHTML;

    if (current === max) {
      let fileSize = formatFileSize(size);
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content">
                              <i class="fa-solid fa-file-lines"></i>
                              <div class="details">
                                <span class="name">${name} * Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fa-solid fa-check"></i>
                          </li>`;
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  }

  timer(0, 10, updateProgressFunction);
}

/**
 * Count from current to max.
 * @param {number} current Current value.
 * @param {number} max Maximum value.
 * @param {Function | undefined} callBack Callback function which is call whenever current value change.
 */
function timer(current = 0, max = 100, callBack) {
  if (current < max) {
    setTimeout(timer.bind(document, current + 1, max, callBack), 100);
  } else {
    current = max;
  }

  if (callBack) {
    callBack(current, max);
  }
}

/**
 * Shorten file name if length is greater or equal to 12.
 * @param {string} name File name.
 * @returns {string} Shortened name.
 */
function shortenFileName(name) {
  if (name.length >= 12) {
    let splitName = name.split('.');
    name = splitName[0].substring(0, 12) + "... ." + splitName[1];
  }
  return name;
}

/**
 * Format file size.
 * @param {number} size File size in bytes.
 * @returns {string} File size in KB or MB.
 */
function formatFileSize(size) {
  let fileSize = "";
  if (size < 1048576) {
    fileSize = (size / 1024).toFixed(2) + " KB";
  } else {
    fileSize = (size / 1048576).toFixed(2) + " MB";
  }
  return fileSize;
}