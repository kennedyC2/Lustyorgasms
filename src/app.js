// DOM LIST
var body = document.querySelector("body");
var mobileMenu = document.getElementById("m-icon");
var dropDownMenu = document.getElementById("dropdown-content");
var rf = document.getElementById("refer");
var form = document.querySelector("form");
var link = document.getElementById("a");
var loader = document.getElementById("loader");
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

cover.addEventListener("click", function (e) {
	if (categoryDisplay.classList.length < 2) {
		e.preventDefault();
		mobileMenu.click();
	}

	if (searchMenu.classList.length < 2) {
		e.preventDefault();
		mobileSearchMenu.click();
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

// ===================================================================================
//                                  AD SCRIPT
// ===================================================================================
var bgAds = document.querySelectorAll("div.ipAd");
var dpAds = document.querySelectorAll("div.dpAd");
var tAds = document.querySelectorAll("div.tAd");
var mAds = document.querySelectorAll("div.mAd");
var fAds = document.querySelectorAll("div.fAd");

// Mobile Ad Function
var mAdLoop = function (item, x) {
	var mbl = document.querySelectorAll("div." + item);
	setInterval(() => {
		var num1 = x;
		for (var prop of mbl) {
			prop.setAttribute("style", "display: none;");
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		for (var prop of elem) {
			prop.removeAttribute("style");
		}

		for (var prop of mAds) {
			if (prop.style !== "") {
				prop.removeAttribute("style");
			}
		}
	}, 10000);
};

var tAdLoop = function (item, x) {
	var tbl = document.querySelectorAll("div." + item);
	setInterval(() => {
		var num1 = x;
		for (var prop of tbl) {
			prop.setAttribute("style", "display: none;");
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		for (var prop of elem) {
			prop.removeAttribute("style");
		}

		for (var prop of tAds) {
			if (prop.style !== "") {
				prop.removeAttribute("style");
			}
		}
	}, 10000);
};

// Tab Ad function
var tab_AdLoop = function (item, x) {
	var ipl = document.querySelectorAll("div." + item);
	setInterval(() => {
		var num1 = x;
		for (var prop of ipl) {
			prop.setAttribute("style", "display: none;");
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		for (var prop of elem) {
			prop.removeAttribute("style");
		}

		for (var prop of bgAds) {
			if (prop.style !== "") {
				prop.removeAttribute("style");
			}
		}
	}, 10000);
};

// Desktop Ad function
var D_AdLoop = function () {
	for (var prop of dpAds) {
		if (prop.style !== "") {
			prop.removeAttribute("style");
		}
	}
};

// Desktop Ad function
var L_AdLoop = function (item, x) {
	var fbl = document.querySelectorAll("div." + item);
	setInterval(() => {
		var num1 = x;
		for (var prop of fbl) {
			prop.setAttribute("style", "display: none;");
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		for (var prop of elem) {
			prop.removeAttribute("style");
		}

		for (var prop of fAds) {
			if (prop.style !== "") {
				prop.removeAttribute("style");
			}
		}
	}, 10000);
};

// Mobile Ad Function
var P_AdLoop = function (item, item2, x) {
	var pbl = document.querySelectorAll("div." + item);
	var pAdCont = document.querySelectorAll("div." + item2);
	setInterval(() => {
		var num1 = x;
		for (var prop of pbl) {
			prop.setAttribute("style", "display: none;");
		}

		var num = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num;
		var elem = document.querySelectorAll("div." + unlock);
		for (var prop of elem) {
			prop.removeAttribute("style");
		}

		for (var prop of pAdCont) {
			prop.removeAttribute("style");
		}
	}, 10000);
};

// MobileAdKickStart
function mStart() {
	mAds = document.querySelectorAll("div.mAd");
	mAdLoop("mbl1A", 6);
	mAdLoop("mbl2A", 6);
	mAdLoop("mbl4A", 6);
}

function tStart() {
	tAds = document.querySelectorAll("div.tAd");
	tAdLoop("tbl1A", 3);
	tAdLoop("tbl1B", 3);
	tAdLoop("tbl1C", 3);
	tAdLoop("tbl4A", 3);
	tAdLoop("tbl4B", 3);
	tAdLoop("tbl4C", 3);
}

// ipAdKickStart
function iStart() {
	bgAds = document.querySelectorAll("div.ipAd");
	tab_AdLoop("ipl1A", 2);
	tab_AdLoop("ipl1B", 2);
	tab_AdLoop("ipl1C", 2);
	tab_AdLoop("ipl4A", 2);
	tab_AdLoop("ipl4B", 2);
	tab_AdLoop("ipl4C", 2);
}

// dpAdKickStart
function dStart() {
	dpAds = document.querySelectorAll("div.dpAd");
	D_AdLoop();
}

// leftAdKickStart
function fStart() {
	fAds = document.querySelectorAll("div.fAd");
	L_AdLoop("fbl1A", 2);
	L_AdLoop("fbl1B", 2);
	L_AdLoop("fbl1C", 2);
}

if (screen.width <= 539) {
	document.addEventListener("DOMContentLoaded", mStart);
} else if (screen.width >= 540 && screen.width <= 767) {
	document.addEventListener("DOMContentLoaded", tStart);
} else if (screen.width >= 768 && screen.width <= 1024) {
	document.addEventListener("DOMContentLoaded", iStart);
} else {
	document.addEventListener("DOMContentLoaded", dStart);
	document.addEventListener("DOMContentLoaded", fStart);
}

if ((body.classList[1] == "play" && screen.width >= 768 && screen.width <= 1200) || (body.classList[1] == "play" && screen.width == 1024)) {
	P_AdLoop("mblA", "mAds1", 6);
	// tAdLoop("tblC", "tAds3", 6);
}

if (body.classList[1] == "play" && screen.width >= 540 && screen.width < 768) {
	P_AdLoop("mblA", "mAds1", 6);
}

if (body.classList[1] == "play" && screen.width > 1200) {
	P_AdLoop("mblA", "mAds1", 6);
}

if (body.className == "mostViewed" || body.className == "newVideos" || body.className == "pornStarList" || body.className == "recommended" || body.className == "search" || body.className == "tagVideo" || body.className == "topRated" || body.className == "videoByCategory") {
	document.addEventListener("DOMContentLoaded", fStart);
}

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
	var conOne = document.querySelectorAll(".conOne img");
	var conTwo = document.querySelectorAll(".conTwo img");
	var conThree = document.querySelectorAll(".conThree img");
	var conFour = document.querySelectorAll(".conFour img");
	var conFive = document.querySelectorAll(".conFive img");
	var conSix = document.querySelectorAll(".conSix img");
	var conSeven = document.querySelectorAll(".conSeven img");

	if (conOne) {
		for (const prop of conOne) {
			observer.observe(prop);
		}
	}

	if (conTwo) {
		for (const prop of conTwo) {
			observer.observe(prop);
		}
	}

	if (conThree) {
		for (const prop of conThree) {
			observer.observe(prop);
		}
	}

	if (conFour) {
		for (const prop of conFour) {
			observer.observe(prop);
		}
	}

	if (conFive) {
		for (const prop of conFive) {
			observer.observe(prop);
		}
	}

	if (conSix) {
		for (const prop of conSix) {
			observer.observe(prop);
		}
	}

	if (conSeven) {
		for (const prop of conSeven) {
			observer.observe(prop);
		}
	}
};

document.addEventListener("DOMContentLoaded", ld);

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
