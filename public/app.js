"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Observer
// ==============================================================================================
var imgObserver;
var pageObserver;
var options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5
};
var path = {
  homepage: "",
  category: "category"
};

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
var handlePageIntersect = function handlePageIntersect(entries, observer) {
  var path = window.location.pathname;
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var target = entry.target;
      var currentPage = target.getAttribute("data-page");
      if (currentPage && path) {
        // Fetch next page content
        fetch("".concat(path, "?p=").concat(currentPage), {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        }).then(function (response) {
          return response.json();
        }).then(function (data) {
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
        })["catch"](function (error) {
          // console.warn('Error fetching next page:', error)
          setTimeout(function () {
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
var loadImg = function loadImg() {
  var conOne = document.querySelectorAll(".middle img");
  if (conOne) {
    var _iterator = _createForOfIteratorHelper(conOne),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prop = _step.value;
        imgObserver.observe(prop);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
};
var loadNextPage = function loadNextPage() {
  var conOne = document.querySelectorAll("section.middle");
  if (conOne) {
    conOne.forEach(function (element, index) {
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
var menuResize = function menuResize() {
  if (screen.width >= 992 && screen.width < 1200) {
    var width = 900 - 40;
    var right = (screen.width - width) / 2;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", "width: ".concat(width, "px; right: ").concat(right, "px;"));
  }
  if (screen.width >= 1200 && screen.width < 1400) {
    var _width = 1140 - 40;
    var _right = (screen.width - _width) / 2;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", "width: ".concat(_width, "px; right: ").concat(_right, "px;"));
  }
  if (screen.width >= 1400) {
    var _width2 = 1320 - 220;
    var _right2 = (screen.width - _width2) / 2;

    // Set width of menu
    document.querySelector(".categories .dropdown-menu").setAttribute("style", "width: ".concat(_width2, "px; right: ").concat(_right2, "px;"));
  }
};
document.addEventListener("DOMContentLoaded", menuResize);
window.addEventListener("resize", menuResize);
screen.addEventListener("orientationchange", menuResize);

// Handle search form submission
// ==============================================================================================
document.querySelector(".search_form").addEventListener("submit", function (e) {
  e.preventDefault();
  var searchInput = document.querySelector(".search_input").value.trim().replace(" ", "_");
  if (searchInput) {
    window.location.href = "search/".concat(encodeURIComponent(searchInput));
  }
});

// Registering a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker').then(function (registration) {
    console.log('Service Worker registered with scope:', registration.scope);
  })["catch"](function (error) {
    console.log('Service Worker registration failed:', error);
  });
}