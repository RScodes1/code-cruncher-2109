let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function arrowFunction(e, id) {
  let arrow = document.getElementById(`arrow${id}`);
  if (e.target.dataset.id == id) {
    arrow.textContent === "expand_less"
      ? (arrow.textContent = "expand_more")
      : (arrow.textContent = "expand_less");
  }
  console.log(e.target.dataset.id);
}
