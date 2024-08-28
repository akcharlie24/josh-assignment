const form = document.getElementById("leave-me-info-form");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  let isValid = true;

  const trimmedName = fullNameInput.value.trim();
  if (trimmedName.length < 3) {
    alert("Please enter your full name (at least 3 words).");
    isValid = false;
  }

  if (emailInput.value === "") {
    alert("Please enter your email address.");
    isValid = false;
  }

  if (isValid) {
    console.log(`Your Full Name: ${fullNameInput.value}`);
    console.log(`Your Email: ${emailInput.value}`);
    console.log(`Subject: ${document.getElementById("subject").value}`);
    console.log(`Your Message: ${document.getElementById("message").value}`);

    alert("Thanks for submitting Your Info!");
  }
});
