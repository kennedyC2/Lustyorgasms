"use strict";

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
mobileMenu.addEventListener("click", function (e) {
	e.preventDefault();
	if (searchMenu.classList.length < 2) {
		searchMenu.classList.add("search-bar-contentz");
		categoryDisplay.classList.toggle("close");
		setTimeout(function () {
			categoryDisplay.classList.toggle("category-out");
		}, 100);
	} else {
		if (categoryDisplay.classList[2] == "close") {
			categoryDisplay.classList.toggle("close");
			setTimeout(function () {
				cover.classList.toggle("rm_Blur");
				categoryDisplay.classList.toggle("category-out");
			}, 100);
		} else {
			cover.classList.toggle("rm_Blur");
			categoryDisplay.classList.toggle("category-out");
			setTimeout(function () {
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
mobileSearchMenu.addEventListener("click", function (e) {
	e.preventDefault();
	if (categoryDisplay.classList.length < 2) {
		categoryDisplay.classList.toggle("category-out");
		setTimeout(function () {
			categoryDisplay.classList.toggle("close");
			searchMenu.classList.toggle("search-bar-contentz");
		}, 100);
	} else {
		cover.classList.toggle("rm_Blur");
		searchMenu.classList.toggle("search-bar-contentz");
	}
});

// Event listener for ip-dropdown menu
ipMobileMenu.addEventListener("click", function (e) {
	e.preventDefault();
	if (ipCategoryDisplay.classList[2] == "close") {
		ipCategoryDisplay.classList.toggle("close");
		setTimeout(function () {
			cover.classList.toggle("rm_Blur");
			ipCategoryDisplay.classList.toggle("category-out");
		}, 100);
	} else {
		cover.classList.toggle("rm_Blur");
		ipCategoryDisplay.classList.toggle("category-out");
		setTimeout(function () {
			ipCategoryDisplay.classList.toggle("close");
		}, 600);
	}
});

// Event Listener for straight list
straight.addEventListener("click", function (e) {
	e.preventDefault();
	gay.classList.remove("clr");
	straight.classList.add("clr");
	straightList.classList.remove("l-display");
	gayList.classList.add("l-display");
});

// Event Listener for gay list
gay.addEventListener("click", function (e) {
	e.preventDefault();
	gay.classList.add("clr");
	straight.classList.remove("clr");
	gayList.classList.remove("l-display");
	straightList.classList.add("l-display");
});

// Event Listener for ip-straight list
ipStraight.addEventListener("click", function (e) {
	e.preventDefault();
	ipGay.classList.remove("clr");
	ipStraight.classList.add("clr");
	ipStraightList.classList.remove("l-display");
	ipGayList.classList.add("l-display");
});

// Event Listener for ip-gay list
ipGay.addEventListener("click", function (e) {
	e.preventDefault();
	ipGay.classList.add("clr");
	ipStraight.classList.remove("clr");
	ipGayList.classList.remove("l-display");
	ipStraightList.classList.add("l-display");
});

// Event listener for desktop categories
dpCategories.addEventListener("click", function (e) {
	e.preventDefault();
	cover.classList.toggle("rm_Blur");
	dpCategoryDisplay.classList.toggle("dp-category-out");
});

// Event Listener for desktop straight list
dpStraight.addEventListener("click", function (e) {
	e.preventDefault();
	dpGay.classList.remove("clr");
	dpStraight.classList.add("clr");
	dpStraightList.classList.remove("l-display");
	dpGayList.classList.add("l-display");
});

// Event Listener for desktop gay list
dpGay.addEventListener("click", function (e) {
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
var mAdLoop = function mAdLoop(item, x) {
	var mbl = document.querySelectorAll("div." + item);
	setInterval(function () {
		var num1 = x;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = mbl[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var prop = _step.value;

				prop.setAttribute("style", "display: none;");
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = elem[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var prop = _step2.value;

				prop.removeAttribute("style");
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = mAds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var prop = _step3.value;

				if (prop.style !== "") {
					prop.removeAttribute("style");
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}
	}, 10000);
};

var tAdLoop = function tAdLoop(item, x) {
	var tbl = document.querySelectorAll("div." + item);
	setInterval(function () {
		var num1 = x;
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = tbl[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var prop = _step4.value;

				prop.setAttribute("style", "display: none;");
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = elem[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var prop = _step5.value;

				prop.removeAttribute("style");
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5.return) {
					_iterator5.return();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		var _iteratorNormalCompletion6 = true;
		var _didIteratorError6 = false;
		var _iteratorError6 = undefined;

		try {
			for (var _iterator6 = tAds[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
				var prop = _step6.value;

				if (prop.style !== "") {
					prop.removeAttribute("style");
				}
			}
		} catch (err) {
			_didIteratorError6 = true;
			_iteratorError6 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion6 && _iterator6.return) {
					_iterator6.return();
				}
			} finally {
				if (_didIteratorError6) {
					throw _iteratorError6;
				}
			}
		}
	}, 10000);
};

// Tab Ad function
var tab_AdLoop = function tab_AdLoop(item, x) {
	var ipl = document.querySelectorAll("div." + item);
	setInterval(function () {
		var num1 = x;
		var _iteratorNormalCompletion7 = true;
		var _didIteratorError7 = false;
		var _iteratorError7 = undefined;

		try {
			for (var _iterator7 = ipl[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
				var prop = _step7.value;

				prop.setAttribute("style", "display: none;");
			}
		} catch (err) {
			_didIteratorError7 = true;
			_iteratorError7 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion7 && _iterator7.return) {
					_iterator7.return();
				}
			} finally {
				if (_didIteratorError7) {
					throw _iteratorError7;
				}
			}
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = elem[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var prop = _step8.value;

				prop.removeAttribute("style");
			}
		} catch (err) {
			_didIteratorError8 = true;
			_iteratorError8 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion8 && _iterator8.return) {
					_iterator8.return();
				}
			} finally {
				if (_didIteratorError8) {
					throw _iteratorError8;
				}
			}
		}

		var _iteratorNormalCompletion9 = true;
		var _didIteratorError9 = false;
		var _iteratorError9 = undefined;

		try {
			for (var _iterator9 = bgAds[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
				var prop = _step9.value;

				if (prop.style !== "") {
					prop.removeAttribute("style");
				}
			}
		} catch (err) {
			_didIteratorError9 = true;
			_iteratorError9 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion9 && _iterator9.return) {
					_iterator9.return();
				}
			} finally {
				if (_didIteratorError9) {
					throw _iteratorError9;
				}
			}
		}
	}, 10000);
};

// Desktop Ad function
var D_AdLoop = function D_AdLoop() {
	var _iteratorNormalCompletion10 = true;
	var _didIteratorError10 = false;
	var _iteratorError10 = undefined;

	try {
		for (var _iterator10 = dpAds[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
			var prop = _step10.value;

			if (prop.style !== "") {
				prop.removeAttribute("style");
			}
		}
	} catch (err) {
		_didIteratorError10 = true;
		_iteratorError10 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion10 && _iterator10.return) {
				_iterator10.return();
			}
		} finally {
			if (_didIteratorError10) {
				throw _iteratorError10;
			}
		}
	}
};

// Desktop Ad function
var L_AdLoop = function L_AdLoop(item, x) {
	var fbl = document.querySelectorAll("div." + item);
	setInterval(function () {
		var num1 = x;
		var _iteratorNormalCompletion11 = true;
		var _didIteratorError11 = false;
		var _iteratorError11 = undefined;

		try {
			for (var _iterator11 = fbl[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
				var prop = _step11.value;

				prop.setAttribute("style", "display: none;");
			}
		} catch (err) {
			_didIteratorError11 = true;
			_iteratorError11 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion11 && _iterator11.return) {
					_iterator11.return();
				}
			} finally {
				if (_didIteratorError11) {
					throw _iteratorError11;
				}
			}
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll("div." + unlock);
		var _iteratorNormalCompletion12 = true;
		var _didIteratorError12 = false;
		var _iteratorError12 = undefined;

		try {
			for (var _iterator12 = elem[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
				var prop = _step12.value;

				prop.removeAttribute("style");
			}
		} catch (err) {
			_didIteratorError12 = true;
			_iteratorError12 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion12 && _iterator12.return) {
					_iterator12.return();
				}
			} finally {
				if (_didIteratorError12) {
					throw _iteratorError12;
				}
			}
		}

		var _iteratorNormalCompletion13 = true;
		var _didIteratorError13 = false;
		var _iteratorError13 = undefined;

		try {
			for (var _iterator13 = fAds[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
				var prop = _step13.value;

				if (prop.style !== "") {
					prop.removeAttribute("style");
				}
			}
		} catch (err) {
			_didIteratorError13 = true;
			_iteratorError13 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion13 && _iterator13.return) {
					_iterator13.return();
				}
			} finally {
				if (_didIteratorError13) {
					throw _iteratorError13;
				}
			}
		}
	}, 10000);
};

// Mobile Ad Function
var P_AdLoop = function P_AdLoop(item, item2, x) {
	var pbl = document.querySelectorAll("div." + item);
	var pAdCont = document.querySelectorAll("div." + item2);
	setInterval(function () {
		var num1 = x;
		var _iteratorNormalCompletion14 = true;
		var _didIteratorError14 = false;
		var _iteratorError14 = undefined;

		try {
			for (var _iterator14 = pbl[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
				var prop = _step14.value;

				prop.setAttribute("style", "display: none;");
			}
		} catch (err) {
			_didIteratorError14 = true;
			_iteratorError14 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion14 && _iterator14.return) {
					_iterator14.return();
				}
			} finally {
				if (_didIteratorError14) {
					throw _iteratorError14;
				}
			}
		}

		var num = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num;
		var elem = document.querySelectorAll("div." + unlock);
		var _iteratorNormalCompletion15 = true;
		var _didIteratorError15 = false;
		var _iteratorError15 = undefined;

		try {
			for (var _iterator15 = elem[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
				var prop = _step15.value;

				prop.removeAttribute("style");
			}
		} catch (err) {
			_didIteratorError15 = true;
			_iteratorError15 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion15 && _iterator15.return) {
					_iterator15.return();
				}
			} finally {
				if (_didIteratorError15) {
					throw _iteratorError15;
				}
			}
		}

		var _iteratorNormalCompletion16 = true;
		var _didIteratorError16 = false;
		var _iteratorError16 = undefined;

		try {
			for (var _iterator16 = pAdCont[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
				var prop = _step16.value;

				prop.removeAttribute("style");
			}
		} catch (err) {
			_didIteratorError16 = true;
			_iteratorError16 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion16 && _iterator16.return) {
					_iterator16.return();
				}
			} finally {
				if (_didIteratorError16) {
					throw _iteratorError16;
				}
			}
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

if (body.classList[1] == "play" && screen.width >= 768 && screen.width <= 1200 || body.classList[1] == "play" && screen.width == 1024) {
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
var observer = void 0;

var options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.5
};

var handleIntersect = function handleIntersect(entries, observer) {
	entries.forEach(function (entry) {
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

var ld = function ld() {
	var conOne = document.querySelectorAll(".conOne img");
	var conTwo = document.querySelectorAll(".conTwo img");
	var conThree = document.querySelectorAll(".conThree img");
	var conFour = document.querySelectorAll(".conFour img");
	var conFive = document.querySelectorAll(".conFive img");
	var conSix = document.querySelectorAll(".conSix img");
	var conSeven = document.querySelectorAll(".conSeven img");

	if (conOne) {
		var _iteratorNormalCompletion17 = true;
		var _didIteratorError17 = false;
		var _iteratorError17 = undefined;

		try {
			for (var _iterator17 = conOne[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
				var prop = _step17.value;

				observer.observe(prop);
			}
		} catch (err) {
			_didIteratorError17 = true;
			_iteratorError17 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion17 && _iterator17.return) {
					_iterator17.return();
				}
			} finally {
				if (_didIteratorError17) {
					throw _iteratorError17;
				}
			}
		}
	}

	if (conTwo) {
		var _iteratorNormalCompletion18 = true;
		var _didIteratorError18 = false;
		var _iteratorError18 = undefined;

		try {
			for (var _iterator18 = conTwo[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
				var _prop = _step18.value;

				observer.observe(_prop);
			}
		} catch (err) {
			_didIteratorError18 = true;
			_iteratorError18 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion18 && _iterator18.return) {
					_iterator18.return();
				}
			} finally {
				if (_didIteratorError18) {
					throw _iteratorError18;
				}
			}
		}
	}

	if (conThree) {
		var _iteratorNormalCompletion19 = true;
		var _didIteratorError19 = false;
		var _iteratorError19 = undefined;

		try {
			for (var _iterator19 = conThree[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
				var _prop2 = _step19.value;

				observer.observe(_prop2);
			}
		} catch (err) {
			_didIteratorError19 = true;
			_iteratorError19 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion19 && _iterator19.return) {
					_iterator19.return();
				}
			} finally {
				if (_didIteratorError19) {
					throw _iteratorError19;
				}
			}
		}
	}

	if (conFour) {
		var _iteratorNormalCompletion20 = true;
		var _didIteratorError20 = false;
		var _iteratorError20 = undefined;

		try {
			for (var _iterator20 = conFour[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
				var _prop3 = _step20.value;

				observer.observe(_prop3);
			}
		} catch (err) {
			_didIteratorError20 = true;
			_iteratorError20 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion20 && _iterator20.return) {
					_iterator20.return();
				}
			} finally {
				if (_didIteratorError20) {
					throw _iteratorError20;
				}
			}
		}
	}

	if (conFive) {
		var _iteratorNormalCompletion21 = true;
		var _didIteratorError21 = false;
		var _iteratorError21 = undefined;

		try {
			for (var _iterator21 = conFive[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
				var _prop4 = _step21.value;

				observer.observe(_prop4);
			}
		} catch (err) {
			_didIteratorError21 = true;
			_iteratorError21 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion21 && _iterator21.return) {
					_iterator21.return();
				}
			} finally {
				if (_didIteratorError21) {
					throw _iteratorError21;
				}
			}
		}
	}

	if (conSix) {
		var _iteratorNormalCompletion22 = true;
		var _didIteratorError22 = false;
		var _iteratorError22 = undefined;

		try {
			for (var _iterator22 = conSix[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
				var _prop5 = _step22.value;

				observer.observe(_prop5);
			}
		} catch (err) {
			_didIteratorError22 = true;
			_iteratorError22 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion22 && _iterator22.return) {
					_iterator22.return();
				}
			} finally {
				if (_didIteratorError22) {
					throw _iteratorError22;
				}
			}
		}
	}

	if (conSeven) {
		var _iteratorNormalCompletion23 = true;
		var _didIteratorError23 = false;
		var _iteratorError23 = undefined;

		try {
			for (var _iterator23 = conSeven[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
				var _prop6 = _step23.value;

				observer.observe(_prop6);
			}
		} catch (err) {
			_didIteratorError23 = true;
			_iteratorError23 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion23 && _iterator23.return) {
					_iterator23.return();
				}
			} finally {
				if (_didIteratorError23) {
					throw _iteratorError23;
				}
			}
		}
	}
};

document.addEventListener("DOMContentLoaded", ld);

// Service Worker
// ====================================================================================================
if ("serviceWorker" in navigator) {
	console.log("CLIENT: service worker registration in progress.");
	navigator.serviceWorker.register("/service-worker").then(function () {
		console.log("CLIENT: service worker registration complete.");
	}, function () {
		console.log("CLIENT: service worker registration failure.");
	});
} else {
	console.log("CLIENT: service worker is not supported.");
}