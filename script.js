// ==============================
// Elements
// ==============================

const header = document.querySelector(".site-header");
const backTop = document.querySelector(".back-top");

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const navLinks = document.querySelectorAll(
    ".nav a[href^='#']"
);

const sections = document.querySelectorAll(
    "main section[id]"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);


// ==============================
// Footer Year
// ==============================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==============================
// Scroll Effects
// ==============================

function handleScroll() {

    // Header
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }


    // Back-to-top button
    if (window.scrollY > 500) {
        backTop.classList.add("visible");
    } else {
        backTop.classList.remove("visible");
    }


    // Active navigation
    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


// Run when scrolling
window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


// Run once when page loads
handleScroll();


// ==============================
// Reveal Animations
// ==============================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


// ==============================
// Back To Top
// ==============================

backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==============================
// Mobile Navigation
// ==============================

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

    }
);


// Close mobile menu after navigation
navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            nav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }
    );

});
