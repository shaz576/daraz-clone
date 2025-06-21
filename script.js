// Run the code only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // DOM ELEMENTS SELECTION 
    const slider = document.querySelector('.slides');  // Main slider container
    const images = document.querySelectorAll('.slideimg');  // All slide images
    const nextBtn = document.querySelector('.next');   // "Next" button
    const prevBtn = document.querySelector('.prev');    // "Previous" button
    const dots = document.querySelectorAll('.dot');    // Navigation dots

    let currentIndex = 0;         // Track current slide index
    let isAnimating = false;      // Prevent multiple animations at once

    //  FUNCTION TO MOVE SLIDE 
    function moveToSlide(index, direction) {
        // Prevent slide transition if another is in progress
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;

        // Remove "active" class from the current slide
        images[currentIndex].classList.remove('active1');

        // Apply slide-out animation to current slide
        if (direction === 'next') {
            images[currentIndex].style.transform = 'translateX(-100%)';
        } else {
            images[currentIndex].style.transform = 'translateX(100%)';
        }

        // Reset incoming slide's position and add "active" class
        images[index].style.transform = 'translateX(0)';
        images[index].classList.add('active1');

        // Update dot indicators
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update the current index to the new slide
        currentIndex = index;

        // After animation duration, allow next animation
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Duration should match your CSS transition
    }

    //  INITIALIZE FIRST SLIDE 
    images.forEach((img, i) => {
        img.style.transform = 'translateX(100%)'; // Hide all slides by default
    });
    images[0].classList.add('active1');          // Show first slide
    images[0].style.transform = 'translateX(0)';  // Position first slide correctly
    dots[0].classList.add('active');             // Activate first dot

    //  NEXT BUTTON CLICK HANDLER 
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % images.length;
        moveToSlide(nextIndex, 'next');
    });

    //  PREVIOUS BUTTON CLICK HANDLER 
    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        moveToSlide(prevIndex, 'prev');
    });

    //  DOT NAVIGATION CLICK HANDLERS 
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const direction = index > currentIndex ? 'next' : 'prev';
            moveToSlide(index, direction);
        });
    });

    //  AUTO SLIDE FUNCTIONALITY 
    let slideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        moveToSlide(nextIndex, 'next');
    }, 4000); // 4 seconds per slide

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto-slide on mouse leave
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            moveToSlide(nextIndex, 'next');
        }, 4000);
    });

});