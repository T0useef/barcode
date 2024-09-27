// Store the CAPTCHA text globally
let captchaText = '';

function generateCaptcha() {
  // Get the canvas element and context
  const canvas = document.getElementById('captcha');
  const ctx = canvas.getContext('2d');

  // Clear the canvas before drawing a new CAPTCHA
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Generate a random string for CAPTCHA
  captchaText = generateRandomText(6);
  
  // Set font style for CAPTCHA
  ctx.font = '30px Arial';
  
  // Add random noise lines to make the CAPTCHA harder to read for bots
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = getRandomColor();
    ctx.stroke();
  }
  
  // Draw the CAPTCHA text on canvas
  ctx.fillStyle = '#000';
  ctx.fillText(captchaText, 20, 35);

  // Add more noise by drawing random dots
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
  }
}

// Function to generate random text of given length
function generateRandomText(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Function to get a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to validate the CAPTCHA input
function validateCaptcha() {
  const userInput = document.getElementById('captcha-input').value;
  const message = document.getElementById('message');

  // Check if the input matches the CAPTCHA text
  if (userInput === captchaText) {
    message.innerHTML = '<span style="color:green;">CAPTCHA verified successfully!</span>';
  } else {
    message.innerHTML = '<span style="color:red;">Incorrect CAPTCHA, please try again.</span>';
  }
}

// Generate the CAPTCHA when the page loads
window.onload = generateCaptcha;
