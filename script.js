document.addEventListener('DOMContentLoaded', function () {
    // Typed.js implementation
    var typed = new Typed('#typed', {
        strings: ["Software Developer", "Robotics Engineer", "Musician", "Professional Gamer"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });

    // Sticky Navigation Bar
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll-triggered Animations and Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.3,
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const target = entry.target;

            // Toggle active class on navigation links based on which section is in view
            if (entry.isIntersecting) {
                document.querySelector(`.nav-links a[href="#${target.id}"]`).classList.add('active');
                target.classList.add('scrolled'); // Add animation when in view
            } else {
                document.querySelector(`.nav-links a[href="#${target.id}"]`).classList.remove('active');
                // Once the element is in view, keep it visible
                if (!target.classList.contains('permanent')) {
                    target.classList.add('permanent');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('permanent'); // Ensure section stays visible after animation
    });

    // Contact Form Email
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    });

    document.addEventListener('DOMContentLoaded', function () {
        const techGrid = document.querySelector('.tech-grid');
    
        // Clone the items to ensure continuous looping
        let clone = techGrid.innerHTML;
        techGrid.innerHTML += clone;
    
        let position = 0;
        const speed = 0.5; // Adjust speed for smoother scrolling
    
        function scrollTechGrid() {
            position -= speed;
    
            // Reset position once we've scrolled through half of the total items to keep it continuous
            if (Math.abs(position) >= techGrid.scrollWidth / 2) {
                position = 0;
            }
    
            techGrid.style.transform = `translateX(${position}px)`;
    
            requestAnimationFrame(scrollTechGrid);
        }
    
        scrollTechGrid();
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('contactForm').addEventListener('submit', function (event) {
            event.preventDefault();
            
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
    
            // EmailJS parameters
            const templateParams = {
                subject: subject,
                message: message,
            };
    
            emailjs.send('service_qbxuazg', 'template_byvek1t', templateParams)
                .then(function(response) {
                    alert('Message sent successfully!', response.status, response.text);
                }, function(error) {
                    alert('Failed to send the message. Please try again later.', error);
                });
        });
    });
    
    
});
