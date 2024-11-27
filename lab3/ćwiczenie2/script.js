document.getElementById('generatePassword').addEventListener('click', () => {
    const minLength = parseInt(document.getElementById('minLength').value);
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeSpecial = document.getElementById('includeSpecial').checked;
  
    if (isNaN(minLength) || isNaN(maxLength) || minLength < 1 || maxLength < minLength) {
      alert('Wprowadź poprawne wartości dla długości hasła!');
      return;
    }
  
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const numbers = '0123456789';
  
    let characters = lowercaseChars + numbers;
  
    if (includeUppercase) characters += uppercaseChars;
    if (includeSpecial) characters += specialChars;
  
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = '';
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  
    alert(`Wygenerowane hasło: ${password}`);
  });
  