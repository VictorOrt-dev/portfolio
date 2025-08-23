// Form Validation and Submission
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  // Reset previous errors
  document.querySelectorAll(".form-error").forEach((error) => {
    error.style.display = "none";
  });
  formSuccess.style.display = "none";

  let isValid = true;

  // Validate name
  if (!name) {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  // Validate message
  if (!message) {
    document.getElementById("messageError").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    // Simulate form submission
    formSuccess.style.display = "block";
    contactForm.reset();

    // Log form data (in real app, send to server)
    console.log("Form submitted:", { name, email, message });
  }
});
