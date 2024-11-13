function handleFormSubmit() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!email || !message) {
      alert("Please fill in all required fields.");
      return false; // Prevent form submission
    }
    alert("Form submitted successfully!");
    return true;
  }
  