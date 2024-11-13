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
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
  

function goToPage(page) {
  window.location.href = page; // Navigate to the specified page
}

  
  