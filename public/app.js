// Observer
// ==============================================================================================
let imgObserver;
let pageObserver;

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};

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

const handlePageIntersect = function (entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Fetch next page content
            var target = entry.target;
            var currentPage = target.getAttribute("data-page");
            if (currentPage) {
                // Fetch next page content
                fetch(`?p=${currentPage}`)
                    .then(response => response.json())
                    .then(data => {
                        // Insert the new content into the page
                        var section = document.createElement("section");
                        section.className = "middle container";
                        section.setAttribute("data-page", data.page);
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

document.addEventListener("DOMContentLoaded", loadImg);
document.addEventListener("DOMContentLoaded", loadNextPage);

// Menu Resize
if (screen.width >= 1200 && screen.width < 1400) {
    const width = 1140 - 305
    const right = 0.15 * 1140;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${0 - right}px;`);
}

if (screen.width >= 1400) {
    const width = 1320 - 290
    const right = 0.10 * 1320;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", `width: ${width}px; right: ${0 - right}px; height: 600px;`);
}