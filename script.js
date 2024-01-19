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

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let message = document.getElementById("message");
let contactSubmitBtn = document.getElementById("contactSubmitBtn");

async function addContact() {
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    message: message.value,
  };
  console.log(contact);

  let res = await fetch("https://mock-final-copy-api.onrender.com/Contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  let data = await res.json();
  console.log(data);
}

contactSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addContact();
  //   console.log(firstName.value);
  //   console.log(lastName.value);
  //   console.log(email.value);
  //   console.log(message.value);
});
