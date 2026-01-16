let menuIcon = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar');
const scrollUp = document.querySelector('.scroll-up');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Logika agar Navbar tertutup saat link diklik
let navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.onclick = () => {
        // Hapus class active untuk menutup navbar
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };
});


window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollUp.classList.add('scroll-active');
  } else {
    scrollUp.classList.remove('scroll-active');
  }
});

const textElement = document.querySelector('.typing-text');
const word = ['Web Development', 'Botz Development'];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedSpeed = 150;

function type() {
  const currentWord = word[wordIndex];

  if (isDeleting) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typedSpeed = 50;
  } else {
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex--;
    typedSpeed = 150;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typedSpeed = 2000;
  } else if (isDeleting && charIndex == 0) {
    isDeleting = false;
    wordIndex++;
    if (wordIndex == word.length) wordIndex = 0;
    typedSpeed = 500;
  }
  setTimeout(type, typedSpeed);
}

document.addEventListener('DOMContentLoaded', type);
