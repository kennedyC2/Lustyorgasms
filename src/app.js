// Observer
// ==============================================================================================
let imgObserver;
let pageObserver;

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};

let path = {
    homepage: "",
    category: "category",
}

// Handle image and page intersection
// ==============================================================================================

// Load images when they come into view
// This is for lazy loading images
var handleImgIntersect = function handleImgIntersect(entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
            var target = entry.target;
            var src = target.getAttribute("src");
            var imgLink = target.getAttribute("data-src");
            if (imgLink) {
                if (!src) {
                    target.setAttribute("src", imgLink);
                }
            }
            observer.unobserve(target);
        }
    });
};


// Load next page when the last section comes into view
// This is for lazy loading next page content
const handlePageIntersect = function (entries, observer) {
    const path = window.location.pathname;
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            var target = entry.target;
            var currentPage = target.getAttribute("data-page");
            if (currentPage && path) {
                // Fetch next page content
                fetch(`${path}?p=${currentPage}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        // Insert the new content into the page
                        var section = document.createElement("section");
                        section.className = "middle container mt-3";
                        section.setAttribute("data-page", data.page);
                        section.setAttribute("data-folder", data.folder);
                        section.innerHTML = data.data;
                        document.querySelector("section.bottom").insertAdjacentElement("beforebegin", section);

                        // Reinitialize observers for new content
                        imgObserver.disconnect();
                        loadImg(); // Reinitialize image observer for new images
                        loadNextPage(); // Reinitialize page observer for new sections
                    })
                    .catch(error => {
                        // console.warn('Error fetching next page:', error)
                        setTimeout(() => {
                            return window.location.href = "/offline";
                        }, 10000);
                    });
            }
            observer.unobserve(target);
        }
    });
};

// Initialize observers
imgObserver = new IntersectionObserver(handleImgIntersect, options);
pageObserver = new IntersectionObserver(handlePageIntersect, options);

const loadImg = function () {
    var conOne = document.querySelectorAll(".middle img");

    if (conOne) {
        for (const prop of conOne) {
            imgObserver.observe(prop);
        }
    }
};

const loadNextPage = function () {
    var conOne = document.querySelectorAll("section.middle");

    if (conOne) {
        conOne.forEach((element, index) => {
            if (index === conOne.length - 1) {
                pageObserver.observe(element);
            }
        });
    }
};

// Load images and next page on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadImg);
document.addEventListener("DOMContentLoaded", loadNextPage);


// Menu Resize for large screens
// ==============================================================================================
const menuResize = () => {
    if (screen.width >= 992 && screen.width < 1200) {
        const width = 900 - 40
        const right = (screen.width - width) / 2;

        // Set width of menu
        document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${right}px;`);
    }

    if (screen.width >= 1200 && screen.width < 1400) {
        const width = 1140 - 40
        const right = (screen.width - width) / 2;

        // Set width of menu
        document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${right}px;`);
    }

    if (screen.width >= 1400) {
        const width = 1320 - 220
        const right = (screen.width - width) / 2;

        // Set width of menu
        document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${right}px;`);
    }
}

document.addEventListener("DOMContentLoaded", menuResize);
window.addEventListener("resize", menuResize);
screen.addEventListener("orientationchange", menuResize);


// Handle search form submission
// ==============================================================================================
document.querySelector(".search_form").addEventListener("submit", function (e) {
    e.preventDefault();
    var searchInput = document.querySelector(".search_input").value.trim().replace(" ", "_");
    if (searchInput) {
        window.location.href = `search/${encodeURIComponent(searchInput)}`;
    }
});

// Registering a service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}