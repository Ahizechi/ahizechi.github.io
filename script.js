document.addEventListener('DOMContentLoaded', function () {

    // Typed.js implementation for typing effect on homepage
    var typed = new Typed('#typed', {
        strings: ["Software Developer", "Robotics Engineer", "Musician", "Professional Gamer"],
        typeSpeed: 50,        // Typing speed in milliseconds
        backSpeed: 50,        // Backspace speed in milliseconds
        backDelay: 1500,      // Delay before backspacing
        startDelay: 500,      // Delay before typing starts
        loop: true,           // Loop the animation
        showCursor: true,     // Show cursor at the end of typed text
        cursorChar: '|',      // Character for the cursor
    });

    // Sticky Navigation Bar: Add 'sticky' class when scrolling beyond 50px
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth Scrolling for Navigation Links: Scroll to section smoothly on link click
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();  // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Scroll to the target section with a smooth behavior
                window.scrollTo({
                    top: targetSection.offsetTop - 50,  // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer: Add animation and highlight active nav link based on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,           // Observe sections in the viewport
        threshold: 0.3,       // Trigger when 30% of section is in view
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const target = entry.target;

            // Highlight active link and trigger section animation
            if (entry.isIntersecting) {
                document.querySelector(`.nav-links a[href="#${target.id}"]`).classList.add('active');
                target.classList.add('scrolled');   // Trigger section animation
            } else {
                document.querySelector(`.nav-links a[href="#${target.id}"]`).classList.remove('active');
                if (!target.classList.contains('permanent')) {
                    target.classList.add('permanent'); // Keep section visible after animation
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('permanent');  // Ensure section stays visible after animation
    });

    // Contact Form Submission using EmailJS
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent page reload

        const templateParams = {
            from_name: document.getElementById('from_name').value,  // User's name
            subject: document.getElementById('subject').value,      // Subject
            message: document.getElementById('message').value,      // Message content
            reply_to: document.getElementById('reply_to').value     // User's email for reply
        };

        // Debugging: Check if the form data is correct
        console.log(templateParams);

        // Send the email via EmailJS
        emailjs.send('service_qbxuazg', 'template_byvek1t', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Message sent successfully!');

                // Clear the form fields
                document.getElementById('contactForm').reset();
                
            }, function (error) {
                console.log('FAILED...', error);
                alert('Failed to send the message. Please try again later.');
            });
    });

    // Continuous Scrolling for Tech Grid: Create a conveyor belt scrolling effect
    const techGrid = document.querySelector('.tech-grid');

    // Clone the items to ensure continuous looping
    let clone = techGrid.innerHTML;
    techGrid.innerHTML += clone;

    let position = 0;
    const speed = 0.5;  // Adjust scrolling speed

    function scrollTechGrid() {
        position -= speed;

        // Reset position once half of the total items are scrolled for looping effect
        if (Math.abs(position) >= techGrid.scrollWidth / 2) {
            position = 0;
        }

        techGrid.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(scrollTechGrid);  // Keep scrolling
    }

    scrollTechGrid();
});
