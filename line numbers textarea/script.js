function addLineClass(linesDiv, textarea) {
  let lines = textarea.innerHTML.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let div = document.createElement("div");
    div.className = "line";
    div.innerHTML = i + 1;
    linesDiv.appendChild(div);
  }
}

window.addEventListener("load", function () {
  let linedTextareas = this.document.getElementsByClassName("lined-textarea");
  for (let i = 0; i < linedTextareas.length; i++) {
    let linesDiv = linedTextareas[i].getElementsByClassName("lines")[0];
    let textarea = linedTextareas[i].getElementsByTagName("textarea")[0];
    addLineClass(linesDiv, textarea);
  }
}, false);

const linedTextareas = Array.from(document.getElementsByClassName("lined-textarea"));
linedTextareas.forEach(linedTextarea => {
  const textarea = linedTextarea.getElementsByTagName("textarea")[0];
  textarea.addEventListener("scroll", (event) => {
    const linesDiv = linedTextarea.getElementsByClassName("lines")[0];
    linesDiv.scrollTop = event.target.scrollTop;
  })
});