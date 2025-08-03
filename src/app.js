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
const handleImgIntersect = function (entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
            var target = entry.target;
            var imgLink = target.getAttribute("data-src");
            if (imgLink) {
                target.setAttribute("src", imgLink);
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
                fetch(`${path}?p=${currentPage}`)
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
                    .catch(error => console.error('Error fetching next page:', error));
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
if (screen.width >= 1200 && screen.width < 1400) {
    const width = 1140 - 300
    const right = 0.15 * 1140;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${0 - right}px;`);
}

if (screen.width >= 1400 && screen.width < 1600) {
    const width = 1320 - 220
    const right = 0.20 * 1320;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${0 - right}px; height: 600px;`);
}

if (screen.width >= 1600) {
    const width = 1320 - 220
    const right = 0.05 * 1320;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${0 - right}px; height: 600px;`);
}


// Handle search form submission
// ==============================================================================================
document.querySelector(".search_form").addEventListener("submit", function (e) {
    e.preventDefault();
    var searchInput = document.querySelector(".search_input").value.trim().replace(" ", "_");
    console.log(searchInput)
    if (searchInput) {
        window.location.href = `search/${encodeURIComponent(searchInput)}`;
    }
});