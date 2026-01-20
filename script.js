let menuIcon = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('.navbar a');
let scrollUp = document.querySelector('.scroll-up');
let typingElement = document.getElementById("typing");
let form = document.getElementById("contactForm");
let loading = document.getElementById("loading");
let sendBtn = document.getElementById("sendBtn");

const TOKEN = "8206480851:AAHo9rz6Li25HBfKJjN-XpabdhDQpiKq9n4";
const CHAT_ID = "7936048379";
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

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

document.querySelectorAll('[data-aos]').forEach((el, i) => {
  el.setAttribute('data-aos-delay', i * 35);
});

  const texts = [
    "Web Developer",
    "Frontend Developer",
    "UI / UX Designer",
    "Botz Developer"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 100;
  const deletingSpeed = 60;
  const delayAfterTyping = 1500;

  function typingEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, delayAfterTyping);
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(
      typingEffect,
      isDeleting ? deletingSpeed : typingSpeed
    );
  }

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

// Run Function
  typingEffect();