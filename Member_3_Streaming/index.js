// Member 3 Streaming - Shared Index JavaScript

document.addEventListener("DOMContentLoaded", () => {
    console.log("Member 3 Streaming project loaded successfully.");
});

// Smooth scrolling for same-page anchor links.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
