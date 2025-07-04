// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdown = navLinks.querySelector('.dropdown');
const dropdownMenu = navLinks.querySelector('.dropdown-menu');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
        // Close dropdown if open
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
    });
});

// Handle dropdown hover for desktop
if (dropdown && dropdownMenu) {
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            dropdownMenu.style.display = 'block';
        }
    });
    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            dropdownMenu.style.display = 'none';
        }
    });
    
    // Handle dropdown click for mobile
    dropdown.querySelector('a').addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
    });
}

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Smooth Scroll for Safari/iOS and dropdown links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Check if it's a link within the Project Scope dropdown
        const isDropdownLink = this.closest('.dropdown-menu');
        
        if (targetId !== '#' && targetId !== '' && !isDropdownLink) { // Prevent default for empty links and dropdown parent
             e.preventDefault(); // Only prevent default for valid section links outside dropdown
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            }
        } else if (isDropdownLink) {
            // For dropdown links, allow default behavior (jumping to section) but close menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
             if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        }
    });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Gallery Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("gallery-slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Remove active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  // Display the current slide and add active class to the corresponding dot
  slides[slideIndex-1].style.display = "block";
  if (dots.length > 0) { // Check if dots exist
      dots[slideIndex-1].className += " active-dot";
  }
}

// Auto slideshow (optional)
// let autoSlideIndex = 0;
// autoShowSlides();

// function autoShowSlides() {
//   let i;
//   let slides = document.getElementsByClassName("gallery-slide");
//    let dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//    for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active-dot", "");
//   }
//   autoSlideIndex++;
//   if (autoSlideIndex > slides.length) {autoSlideIndex = 1}
//   slides[autoSlideIndex-1].style.display = "block";
//    if (dots.length > 0) { // Check if dots exist
//       dots[autoSlideIndex-1].className += " active-dot";
//    }
//   setTimeout(autoShowSlides, 5000); // Change image every 5 seconds
// }

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}); 