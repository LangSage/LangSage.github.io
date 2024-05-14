function playAudio(audioFile) {
    var audio = new Audio(audioFile);
    audio.play();
}
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// Show or hide the scroll-to-top button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        // Display the scroll-to-top button
        document.getElementById("scrollToTopBtn").style.display = "block";
        // Add 'show' class to make the button gently appear
        document.getElementById("scrollToTopBtn").classList.add("show");
    } else {
        // Hide the scroll-to-top button
        document.getElementById("scrollToTopBtn").style.display = "none";
        // Remove 'show' class to hide the button
        document.getElementById("scrollToTopBtn").classList.remove("show");
    }
};
