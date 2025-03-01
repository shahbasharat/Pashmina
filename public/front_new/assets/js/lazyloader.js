document.addEventListener("DOMContentLoaded", function () {

    var lazyImages = document.querySelectorAll("img[loading='lazy']");
    
    if ("IntersectionObserver" in window) {
        var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
            var lazyImage = entry.target;
            lazyImage.src = lazyImage.getAttribute('data-src');
            lazyImage.removeAttribute("data-src");
            lazyImageObserver.unobserve(lazyImage);
            }
        });
        });
    
        lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        for (var i = 0; i < lazyImages.length; i++) {
        var lazyImage = lazyImages[i];
        lazyImage.src = lazyImage.getAttribute('data-src');
        lazyImage.removeAttribute("data-src");
        }
    }
});