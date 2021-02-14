// DOM LIST
var body = document.querySelector('body');
var mobileMenu = document.getElementById('m-icon');
var dropDownMenu = document.getElementById('dropdown-content');
var mobileSearchMenu = document.getElementById('s-icon');
var searchMenu = document.getElementById('search-bar-content');
var ipMobileMenu = document.getElementById('ip-m-icon');
var ipDropDownMenu = document.getElementById('ip-dropdown-content');
var categories = document.getElementById('categories');
var categoryDisplay = document.getElementById('category-outer');
var straight = document.getElementById('str-click');
var straightList = document.getElementById('str');
var gay = document.getElementById('gy-click');
var gayList = document.getElementById('gy');
var ipCategories = document.getElementById('ip-categories');
var ipCategoryDisplay = document.getElementById('ip-category-outer');
var ipStraight = document.getElementById('ip-str-click');
var ipStraightList = document.getElementById('ip-str');
var ipGay = document.getElementById('ip-gy-click');
var ipGayList = document.getElementById('ip-gy');
var dpCategories = document.getElementById('dp-ctg');
var dpCategoryDisplay = document.getElementById('dp-category-outer');
var dpStraight = document.getElementById('dp-str-click');
var dpStraightList = document.getElementById('dp-str');
var dpGay = document.getElementById('dp-gy-click');
var dpGayList = document.getElementById('dp-gy');
var cover = document.getElementById('outer-container');

// Event listeners for mobile menu
mobileMenu.addEventListener('click', (e) => {
	e.preventDefault();
	if (searchMenu.classList.length < 2) {
		searchMenu.classList.add('search-bar-contentz');
		categoryDisplay.classList.toggle('close');
		setTimeout(() => {
			categoryDisplay.classList.toggle('category-out');
		}, 100);
	} else {
		if (categoryDisplay.classList[2] == 'close') {
			categoryDisplay.classList.toggle('close');
			setTimeout(() => {
				cover.classList.toggle('rm_Blur');
				categoryDisplay.classList.toggle('category-out');
			}, 100);
		} else {
			cover.classList.toggle('rm_Blur');
			categoryDisplay.classList.toggle('category-out');
			setTimeout(() => {
				categoryDisplay.classList.toggle('close');
			}, 600);
		}
	}
});

// Event listeners for mobile search menu
mobileSearchMenu.addEventListener('click', (e) => {
	e.preventDefault();
	if (categoryDisplay.classList.length < 2) {
		categoryDisplay.classList.toggle('category-out');
		setTimeout(() => {
			categoryDisplay.classList.toggle('close');
			searchMenu.classList.toggle('search-bar-contentz');
		}, 100);
	} else {
		cover.classList.toggle('rm_Blur');
		searchMenu.classList.toggle('search-bar-contentz');
	}
});

// Event listener for ip-dropdown menu
ipMobileMenu.addEventListener('click', (e) => {
	e.preventDefault();
	if (ipCategoryDisplay.classList[2] == 'close') {
		ipCategoryDisplay.classList.toggle('close');
		setTimeout(() => {
			cover.classList.toggle('rm_Blur');
			ipCategoryDisplay.classList.toggle('category-out');
		}, 100);
	} else {
		cover.classList.toggle('rm_Blur');
		ipCategoryDisplay.classList.toggle('category-out');
		setTimeout(() => {
			ipCategoryDisplay.classList.toggle('close');
		}, 600);
	}
});

// Event Listener for straight list
straight.addEventListener('click', (e) => {
	e.preventDefault();
	gay.classList.remove('clr');
	straight.classList.add('clr');
	straightList.classList.remove('l-display');
	gayList.classList.add('l-display');
});

// Event Listener for gay list
gay.addEventListener('click', (e) => {
	e.preventDefault();
	gay.classList.add('clr');
	straight.classList.remove('clr');
	gayList.classList.remove('l-display');
	straightList.classList.add('l-display');
});

// Event Listener for ip-straight list
ipStraight.addEventListener('click', (e) => {
	e.preventDefault();
	ipGay.classList.remove('clr');
	ipStraight.classList.add('clr');
	ipStraightList.classList.remove('l-display');
	ipGayList.classList.add('l-display');
});

// Event Listener for ip-gay list
ipGay.addEventListener('click', (e) => {
	e.preventDefault();
	ipGay.classList.add('clr');
	ipStraight.classList.remove('clr');
	ipGayList.classList.remove('l-display');
	ipStraightList.classList.add('l-display');
});

// Event listener for desktop categories
dpCategories.addEventListener('click', (e) => {
	e.preventDefault();
	cover.classList.toggle('rm_Blur');
	dpCategoryDisplay.classList.toggle('dp-category-out');
});

// Event Listener for desktop straight list
dpStraight.addEventListener('click', (e) => {
	e.preventDefault();
	dpGay.classList.remove('clr');
	dpStraight.classList.add('clr');
	dpStraightList.classList.remove('l-display');
	dpGayList.classList.add('l-display');
});

// Event Listener for desktop gay list
dpGay.addEventListener('click', (e) => {
	e.preventDefault();
	dpGay.classList.add('clr');
	dpStraight.classList.remove('clr');
	dpGayList.classList.remove('l-display');
	dpStraightList.classList.add('l-display');
});

// ===================================================================================
//                                  AD SCRIPT
// ===================================================================================
var bgAds = document.querySelectorAll('div.bgAd');
var mAds1 = document.querySelectorAll('div.mAds1');
var mAds2 = document.querySelectorAll('div.mAds2');
var mAds3 = document.querySelectorAll('div.mAds3');
var mAds4 = document.querySelectorAll('div.mAds4');

// Mobile Ad Function
var mobileAdLoop = function (item, item2, x) {
	var mbl = document.querySelectorAll('div.' + item);
	var mAdCont = document.querySelectorAll('div.' + item2);
	setInterval(() => {
		var num1 = x;
		for (var prop of mbl) {
			prop.setAttribute('style', 'display: none;');
		}

		var num = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num;
		var elem = document.querySelectorAll('div.' + unlock);
		for (var prop of elem) {
			prop.removeAttribute('style');
		}

		for (var prop of mAdCont) {
			prop.removeAttribute('style');
		}
	}, 10000);
};

// Tab & Desktop Ad function
var tabD_AdLoop = function (item, x) {
	var tbl = document.querySelectorAll('div.' + item);
	setInterval(() => {
		var num1 = x;
		for (var prop of tbl) {
			prop.setAttribute('style', 'display: none;');
		}

		var num2 = Math.floor(Math.random() * num1) + 1;
		var unlock = item + num2;
		var elem = document.querySelectorAll('div.' + unlock);
		for (var prop of elem) {
			prop.removeAttribute('style');
		}

		for (var prop of bgAds) {
			if (prop.style !== '') {
				prop.removeAttribute('style');
			}
		}
	}, 10000);
};

// MobileAdKickStart
function mStart() {
	mobileAdLoop('mblA', 'mAds1', 6);
	mobileAdLoop('mblB', 'mAds2', 6);
	mobileAdLoop('mblC', 'mAds3', 6);
	mobileAdLoop('mblD', 'mAds4', 6);
};

// OtherAdKickStart
function dStart() {
	tabD_AdLoop('tbl1A', 2);
	tabD_AdLoop('tbl1B', 2);
	tabD_AdLoop('tbl1C', 2);
	tabD_AdLoop('tbl2A', 2);
	tabD_AdLoop('tbl2B', 2);
	tabD_AdLoop('tbl2C', 2);
	tabD_AdLoop('tbl3A', 2);
	tabD_AdLoop('tbl3B', 2);
	tabD_AdLoop('tbl3C', 2);
	tabD_AdLoop('tbl4A', 2);
	tabD_AdLoop('tbl4B', 2);
	tabD_AdLoop('tbl4C', 2);
};

if (screen.width <= 767) {
	document.addEventListener('DOMContentLoaded', mStart)
} else {
	document.addEventListener('DOMContentLoaded', dStart)
}

if (
	(body.classList[1] == 'play' && screen.width >= 768 && screen.width <= 1200) ||
	(body.classList[1] == 'play' && screen.width == 1024)
) {
	mobileAdLoop('mblA', 'mAds1', 6);
	mobileAdLoop('mblC', 'mAds3', 6);
}

if (body.classList[1] == 'play' && screen.width > 1200) {
	mobileAdLoop('mblC', 'mAds3', 6);
}

if (
	body.className == 'mostViewed' ||
	body.className == 'newVideos' ||
	body.className == 'pornStarList' ||
	body.className == 'recommended' ||
	body.className == 'search' ||
	body.className == 'tagVideo' ||
	body.className == 'topRated' ||
	body.className == 'videoByCategory'
) {
	mobileAdLoop('mblB', 'mAds2', 6);
	mobileAdLoop('mblC', 'mAds3', 6);
}

// Service Worker
// ====================================================================================================
if ('serviceWorker' in navigator) {
	console.log('CLIENT: service worker registration in progress.');
	navigator.serviceWorker.register('/service-worker').then(
		function () {
			console.log('CLIENT: service worker registration complete.');
		},
		function () {
			console.log('CLIENT: service worker registration failure.');
		}
	);
} else {
	console.log('CLIENT: service worker is not supported.');
}
