// DOM LIST
var body = document.querySelector("body");
var mobileMenu = document.getElementById("m-icon");
var dropDownMenu = document.getElementById("dropdown-content");
var mobileSearchMenu = document.getElementById("s-icon");
var searchMenu = document.getElementById("search-bar-content");
var ipMobileMenu = document.getElementById("ip-m-icon");
var ipDropDownMenu = document.getElementById("ip-dropdown-content");
var categories = document.getElementById("categories");
var categoryDisplay = document.getElementById("category-outer");
var straight = document.getElementById("str-click");
var straightList = document.getElementById("str");
var gay = document.getElementById("gy-click");
var gayList = document.getElementById("gy");
var ipCategories = document.getElementById("ip-categories");
var ipCategoryDisplay = document.getElementById("ip-category-outer");
var ipStraight = document.getElementById("ip-str-click");
var ipStraightList = document.getElementById("ip-str");
var ipGay = document.getElementById("ip-gy-click");
var ipGayList = document.getElementById("ip-gy");
var dpCategories = document.getElementById("dp-ctg");
var dpCategoryDisplay = document.getElementById("dp-category-outer");
var dpStraight = document.getElementById("dp-str-click");
var dpStraightList = document.getElementById("dp-str");
var dpGay = document.getElementById("dp-gy-click");
var dpGayList = document.getElementById("dp-gy");
var cover = document.getElementById("outer-container");

// Event listeners for mobile menu
mobileMenu.addEventListener("click", (e) => {
	e.preventDefault();
	if (searchMenu.classList.length < 2) {
		searchMenu.classList.add("search-bar-contentz");
		categoryDisplay.classList.toggle("close");
		setTimeout(() => {
			categoryDisplay.classList.toggle("category-out");
		}, 100);
	} else {
		if (categoryDisplay.classList[2] == "close") {
			categoryDisplay.classList.toggle("close");
			setTimeout(() => {
				cover.classList.toggle("rm_Blur");
				categoryDisplay.classList.toggle("category-out");
			}, 100);
		} else {
			cover.classList.toggle("rm_Blur");
			categoryDisplay.classList.toggle("category-out");
			setTimeout(() => {
				categoryDisplay.classList.toggle("close");
			}, 600);
		}
	}
});

// Event listeners for mobile search menu
mobileSearchMenu.addEventListener("click", (e) => {
	e.preventDefault();
	if (categoryDisplay.classList.length < 2) {
		categoryDisplay.classList.toggle("category-out");
		setTimeout(() => {
			categoryDisplay.classList.toggle("close");
			searchMenu.classList.toggle("search-bar-contentz");
		}, 100);
	} else {
		cover.classList.toggle("rm_Blur");
		searchMenu.classList.toggle("search-bar-contentz");
	}
});

// Event listener for ip-dropdown menu
ipMobileMenu.addEventListener("click", (e) => {
	e.preventDefault();
	if (ipCategoryDisplay.classList[2] == "close") {
		ipCategoryDisplay.classList.toggle("close");
		setTimeout(() => {
			cover.classList.toggle("rm_Blur");
			ipCategoryDisplay.classList.toggle("category-out");
		}, 100);
	} else {
		cover.classList.toggle("rm_Blur");
		ipCategoryDisplay.classList.toggle("category-out");
		setTimeout(() => {
			ipCategoryDisplay.classList.toggle("close");
		}, 600);
	}
});

// Event Listener for straight list
straight.addEventListener("click", (e) => {
	e.preventDefault();
	gay.classList.remove("clr");
	straight.classList.add("clr");
	straightList.classList.remove("l-display");
	gayList.classList.add("l-display");
});

// Event Listener for gay list
gay.addEventListener("click", (e) => {
	e.preventDefault();
	gay.classList.add("clr");
	straight.classList.remove("clr");
	gayList.classList.remove("l-display");
	straightList.classList.add("l-display");
});

// Event Listener for ip-straight list
ipStraight.addEventListener("click", (e) => {
	e.preventDefault();
	ipGay.classList.remove("clr");
	ipStraight.classList.add("clr");
	ipStraightList.classList.remove("l-display");
	ipGayList.classList.add("l-display");
});

// Event Listener for ip-gay list
ipGay.addEventListener("click", (e) => {
	e.preventDefault();
	ipGay.classList.add("clr");
	ipStraight.classList.remove("clr");
	ipGayList.classList.remove("l-display");
	ipStraightList.classList.add("l-display");
});

// Event listener for desktop categories
dpCategories.addEventListener("click", (e) => {
	e.preventDefault();
	cover.classList.toggle("rm_Blur");
	dpCategoryDisplay.classList.toggle("dp-category-out");
});

// Event Listener for desktop straight list
dpStraight.addEventListener("click", (e) => {
	e.preventDefault();
	dpGay.classList.remove("clr");
	dpStraight.classList.add("clr");
	dpStraightList.classList.remove("l-display");
	dpGayList.classList.add("l-display");
});

// Event Listener for desktop gay list
dpGay.addEventListener("click", (e) => {
	e.preventDefault();
	dpGay.classList.add("clr");
	dpStraight.classList.remove("clr");
	dpGayList.classList.remove("l-display");
	dpStraightList.classList.add("l-display");
});

// Service Worker
// ====================================================================================================
if ("serviceWorker" in navigator) {
	console.log("CLIENT: service worker registration in progress.");
	navigator.serviceWorker.register("/service-worker").then(
		function () {
			console.log("CLIENT: service worker registration complete.");
		},
		function () {
			console.log("CLIENT: service worker registration failure.");
		},
	);
} else {
	console.log("CLIENT: service worker is not supported.");
}
