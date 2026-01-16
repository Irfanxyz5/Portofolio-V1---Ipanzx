let menuIcon = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');
let scrollUp = document.querySelector('.scroll-up');

const TOKEN = "8206480851:AAHo9rz6Li25HBfKJjN-XpabdhDQpiKq9n4";
const CHAT_ID = "7936048379";
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const form = document.getElementById("contactForm");
const loading = document.getElementById("loading");
const sendBtn = document.getElementById("sendBtn");



// Click Navbar 
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});

// function Scrol navbar

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollUp.classList.add('scroll-active');
  } else {
    scrollUp.classList.remove('scroll-active');
  }
});

// function connect to bot telegram

form.addEventListener("submit", function (e) {
  e.preventDefault();

  loading.style.display = "block";
  sendBtn.classList.add("loading");
  sendBtn.value = "Sending...";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  const telegramMessage = `
━━━━━━━━━━━━━━━━━━
📬 *CONTACT FORM*
━━━━━━━━━━━━━━━━━━

👤 *Name*  
${name}

📧 *Email*  
${email}

📌 *Subject*  
${subject}

💬 *Message*  
${message}

━━━━━━━━━━━━━━━━━━
⏰ ${new Date().toLocaleString()}
`;

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: telegramMessage,
      parse_mode: "Markdown"
    })
  })
  .then(res => {
    if (res.ok) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message");
    }
  })
  .catch(err => {
    console.error(err);
    alert("⚠️ Error sending message");
  })
  .finally(() => {
    loading.style.display = "none";
    sendBtn.classList.remove("loading");
    sendBtn.value = "Send Message";
  });
});