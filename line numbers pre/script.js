function addLineClass(pre) {
  let lines = pre.innerHTML.split("\n");
  while (pre.childNodes.length > 0) {
    pre.removeChild(pre.childNodes[0]);
  }
  for (let i = 0; i < lines.length; i++) {
    let span = document.createElement("span");
    span.className = "line";
    span.innerHTML = lines[i];
    pre.appendChild(span);
    pre.appendChild(document.createTextNode("\n"));
  }
}
window.addEventListener("load", function () {
  let pres = this.document.getElementsByTagName("pre");
  for (let i = 0; i < pres.length; i++) {
    addLineClass(pres[i]);
  }
}, false);