// function handleFormSubmit() {
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;
//     if (!email || !message) {
//       alert("Please fill in all required fields.");
//       return false; // Prevent form submission
//     }
//     alert("Form submitted successfully!");
//     return true;
//   }


function toggleInfo() {
    const info = document.getElementById('extraInfo');
  info.style.display = (info.style.display === 'none' || info.style.display === '') ? 'block' : 'none';
  }

  
  
  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
    return i;
}
  

function goToPage(page) {
  window.location.href = page; 
}



function handleFormSubmit() {
  const emailField = document.getElementById("email");
  const errorField = document.getElementById("error");

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailField.value)) {
      errorField.style.display = "block";
      emailField.style.border = "2px solid red"; 
      return false; 
  }

  errorField.style.display = "none"; 
  emailField.style.border = "1px solid #ccc"; 
  return true; 
}

  
  