// Observer
// ==============================================================================================
let observer;

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};

const handleIntersect = function (entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
            var con = entry.target;
            var conLink = con.getAttribute("data-src");
            if (conLink) {
                con.setAttribute("src", conLink);
            }
            observer.unobserve(con);
        }
    });
};

observer = new IntersectionObserver(handleIntersect, options);

const ld = function () {
    var conOne = document.querySelectorAll(".middle img");

    if (conOne) {
        for (const prop of conOne) {
            observer.observe(prop);
        }
    }
};

document.addEventListener("DOMContentLoaded", ld);