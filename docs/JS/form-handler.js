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
    error.classList.remove("show");
  });
  formSuccess.classList.remove("show");

  let isValid = true;

  // Validate name
  if (!name) {
    document.getElementById("nameError").classList.add("show");
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById("emailError").classList.add("show");
    isValid = false;
  }

  // Validate message
  if (!message) {
    document.getElementById("messageError").classList.add("show");
    isValid = false;
  }

  if (isValid) {
    // Simulate form submission 
    formSuccess.classList.add("show");
    contactForm.reset();

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 5000);

    // Log form data (in real app, send to server)
    console.log("Form submitted:", { name, email, message });
  }
});
