'use strict';



// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});



// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]")
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);



// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});


// Minimal Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.minimal-gallery-item');
    const modal = document.getElementById('minimalGalleryModal');
    const modalImage = document.getElementById('minimalGalleryModalImage');
    const closeBtn = document.getElementById('minimalGalleryClose');
    const prevBtn = document.getElementById('minimalGalleryPrev');
    const nextBtn = document.getElementById('minimalGalleryNext');
    const modalBackdrop = document.querySelector('.minimal-gallery-modal-backdrop');
    
    let currentImageIndex = 0;
    let imageElements = [];
    
    // Initialize gallery
    initGallery();
    
    function initGallery() {
        // Get all image elements
        imageElements = Array.from(document.querySelectorAll('.minimal-gallery-image'));
        
        // Add click handlers to gallery items
        galleryItems.forEach((item, index) => {
            const imageWrapper = item.querySelector('.minimal-gallery-image-wrapper');
            imageWrapper.addEventListener('click', () => openModal(index));
        });
        
        // Add modal event listeners
        closeBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Prevent context menu on images
        imageElements.forEach(img => {
            img.addEventListener('contextmenu', (e) => e.preventDefault());
        });
    }
    
    function openModal(index) {
        currentImageIndex = index;
        const img = imageElements[index];
        
        // Set modal image source
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        
        // Show modal
        modal.classList.add('minimal-gallery-active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        updateNavButtons();
        
        // Preload adjacent images
        preloadAdjacentImages();
    }
    
    function closeModal() {
        modal.classList.remove('minimal-gallery-active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    }
    
    function showNextImage() {
        if (currentImageIndex < imageElements.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    }
    
    function updateModalImage() {
        const img = imageElements[currentImageIndex];
        
        // Add fade effect
        modalImage.style.opacity = '0.5';
        
        setTimeout(() => {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalImage.style.opacity = '1';
        }, 150);
        
        updateNavButtons();
        preloadAdjacentImages();
    }
    
    function updateNavButtons() {
        // Update previous button
        prevBtn.disabled = currentImageIndex === 0;
        
        // Update next button
        nextBtn.disabled = currentImageIndex === imageElements.length - 1;
    }
    
    function preloadAdjacentImages() {
        // Preload previous image
        if (currentImageIndex > 0) {
            const prevImg = new Image();
            prevImg.src = imageElements[currentImageIndex - 1].src;
        }
        
        // Preload next image
        if (currentImageIndex < imageElements.length - 1) {
            const nextImg = new Image();
            nextImg.src = imageElements[currentImageIndex + 1].src;
        }
    }
    
    function handleKeyboard(e) {
        if (!modal.classList.contains('minimal-gallery-active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                showPrevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                showNextImage();
                break;
        }
    }
    
    // Handle image loading errors
    imageElements.forEach((img, index) => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Hide the gallery item if image fails to load
            const galleryItem = this.closest('.minimal-gallery-item');
            if (galleryItem) {
                galleryItem.style.display = 'none';
            }
        });
        
        // Add loading state
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                showNextImage();
            } else {
                // Swipe right - previous image
                showPrevImage();
            }
        }
    }
    
    // Auto-refresh gallery items if new images are added dynamically
    function refreshGallery() {
        const newGalleryItems = document.querySelectorAll('.minimal-gallery-item');
        const newImageElements = Array.from(document.querySelectorAll('.minimal-gallery-image'));
        
        if (newImageElements.length !== imageElements.length) {
            imageElements = newImageElements;
            
            // Add click handlers to new items
            newGalleryItems.forEach((item, index) => {
                const imageWrapper = item.querySelector('.minimal-gallery-image-wrapper');
                const existingHandler = imageWrapper.onclick;
                
                if (!existingHandler) {
                    imageWrapper.addEventListener('click', () => openModal(index));
                }
            });
        }
    }
    
    // Check for new images every 2 seconds (useful if images are added dynamically)
    setInterval(refreshGallery, 2000);
    
    // Utility function to add new gallery item programmatically
    window.addGalleryImage = function(imageSrc, altText) {
        const galleryGrid = document.querySelector('.minimal-gallery-grid');
        const newItem = document.createElement('div');
        newItem.className = 'minimal-gallery-item';
        
        newItem.innerHTML = `
            <div class="minimal-gallery-image-wrapper">
                <img src="${imageSrc}" alt="${altText || 'Gallery Image'}" class="minimal-gallery-image">
                <div class="minimal-gallery-overlay">
                    <div class="minimal-gallery-zoom-icon">+</div>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(newItem);
        
        // Refresh gallery to include new item
        setTimeout(refreshGallery, 100);
    };
    
    // Utility function to remove all gallery images (for dynamic loading)
    window.clearGallery = function() {
        const galleryGrid = document.querySelector('.minimal-gallery-grid');
        galleryGrid.innerHTML = '';
        imageElements = [];
    };
    
    // Smooth scroll to gallery (if needed)
    window.scrollToGallery = function() {
        const gallerySection = document.querySelector('.minimal-gallery-section');
        gallerySection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };
});