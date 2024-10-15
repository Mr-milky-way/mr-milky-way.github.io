//V5.1
if(typeof gameConfig.AdsWaitForInput === "undefined") gameConfig.AdsWaitForInput = true;	//handle default to support old index-config with the new SDK

function onVisibilityChanged() {
	if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
		if(typeof cr_setSuspended !== "undefined") cr_setSuspended(true);
	else
		if(typeof cr_setSuspended !== "undefined") cr_setSuspended(false);
};

document.addEventListener("visibilitychange", onVisibilityChanged, false);
document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
document.addEventListener("msvisibilitychange", onVisibilityChanged, false);


var adsIsQueued = false;
function queueAds(){
	adsIsQueued = true;
}

function unQueueAds(){
	adsIsQueued = false;
	if(typeof gdsdk !== "undefined" && gdsdk.showBanner !== "undefined") gdsdk.showBanner();
}

function onTouchEvent(){
	if(adsIsQueued){
		if($("#preroll_play_bg, #preroll_play_over_bg, #preroll_play_frame").length){
			$("#preroll_play_bg, #preroll_play_over_bg, #preroll_play_frame").remove();
			if(typeof cr_setSuspended === "function") cr_setSuspended(false);
			$("#c2canvas").show();
		}
		unQueueAds();
	}
}

document.addEventListener("mouseup", onTouchEvent, false);
document.addEventListener("touchend", onTouchEvent, false);

function c2LayoutChange(state,name,force){
	if(state === "in" && name.toLowerCase() === "gameover"){
		if(gameConfig.debugMode) console.log("(game break) gdsdk.showBanner()");
		// gdApi.showBanner(); //old
		if(typeof gameConfig.AdsWaitForInput === "boolean" && gameConfig.AdsWaitForInput) queueAds();
		else if(typeof gdsdk !== "undefined" && gdsdk.showBanner !== "undefined") gdsdk.showBanner();
	}
}

//ROTATOR START
var onMobile, reallyOnMobile; onMobile = reallyOnMobile = (navigator.userAgent.match(/(mobile|android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi));
function checkOrientation(){
	if(!gameConfig.activeRotator || !reallyOnMobile){
		hideRotator();
		return true;
	}
	if(gameConfig.gameIsPortrait && jQuery(window).width() > jQuery(window).height()){
		displayRotator('portrait');
		return false;
	}
	if(!gameConfig.gameIsPortrait && jQuery(window).width() < jQuery(window).height()){
		displayRotator('landscape');
		return false;
	}
	hideRotator();
	return true;
}

function displayRotator(orientation){
	var gameElement = document.getElementById("c2canvasdiv");
	var rotatorElement = document.getElementById("rotator");
	if(rotatorElement.style.display != "none") return false;
	if(typeof cr_setSuspended === "function") cr_setSuspended(true);
	gameElement.style.display = "none";
	rotatorElement.innerHTML = "";
	rotatorElement.innerHTML = '<img id="rotatorLogo" src="./rotate-device-to-' + orientation + '.jpg" />';
	rotatorElement.style.display = "block";
	rotatorElement.style.backgroundColor = "black";
	rotatorElement.style.width = "100%";
	rotatorElement.style.height = "100%";
	window.centerRotatorTimer = setInterval(function(){	centerRotator();	}, 100);
	return true;
}

function centerRotator(){
	var rotatorElement = document.getElementById("rotator");
	rotatorElement.style.paddingLeft = jQuery(window).width() / 2 - jQuery("#rotatorLogo").width() / 2 +"px";
	rotatorElement.style.paddingTop = jQuery(window).height() / 2 - jQuery("#rotatorLogo").height() / 2 +"px";
	rotatorElement.style.paddingBottom = jQuery(window).height() / 2 - jQuery("#rotatorLogo").height() / 2 +"px";
}

function hideRotator(){
	var gameElement = document.getElementById("c2canvasdiv");
	var rotatorElement = document.getElementById("rotator");
	if(rotatorElement == null) return false;
	if(rotatorElement.style.display == "none") return false;
	rotatorElement.innerHTML = "";
	rotatorElement.style.display = "none";
	gameElement.style.display = "block";
	cr_setSuspended(false);
	clearInterval(window.centerRotatorTimer);
	return true;
}

var waitForJQ = setInterval(function(){
		if(typeof jQuery === "undefined") return;
		jQuery(document).ready(function (){
			if(checkOrientation() || !gameConfig.activeRotator)	hideRotator();
			if(gameConfig.activeRotator && reallyOnMobile){
				jQuery(window).resize(function(){
					if(checkOrientation())	hideRotator();
				});
			}
		});
		clearInterval(waitForJQ);
	},100);
//ROTATOR END
function loadGame(){			
	if(typeof cr_createRuntime === "function") cr_createRuntime("c2canvas");
	else setTimeout(loadGame, 500);
}
window["GD_OPTIONS"] = {
     "gameId": gameConfig.gameId
    ,"onEvent": function(event) {
		if(gameConfig.debugMode) console.log("gdsdk.event(", event.name, ",", arguments, ")");
        switch (event.name) {
			case "SDK_ERROR":
				console.log("Error: ", arguments);
            case "SDK_READY":
				jQuery(document).ready(function(){
					loadGame();
					if(typeof gameConfig.AdsWaitForInput === "boolean" && gameConfig.AdsWaitForInput) queueAds();
				});
				break;
            case "SDK_GAME_START":
				if(typeof cr_setSuspended === "function") cr_setSuspended(false);
                break;
            case "SDK_GAME_PAUSE":
				if(typeof cr_setSuspended === "function") cr_setSuspended(true);
                break;
        }
    }
	,"debug":gameConfig.debugMode
	,"prefix":""
	,"advertisementSettings": {
		 "debug": gameConfig.debugMode
		,"autoplay": false
		//,"locale": "en"
    }
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'gamedistribution/js/main.min.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'gamedistribution-jssdk'));