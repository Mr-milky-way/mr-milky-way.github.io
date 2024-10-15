;(function(){
/*********************************************
				Shop Manager
*********************************************/
	/*********************************************
				var
	*********************************************/
	var shopManager = function(){};
	shopManager.version = 2;
	/*********************************************
				function
	*********************************************/
	/*
	*	shopManager.init()     : load json and create stash
	*
	*	@param : string _json
	*/
	shopManager.prototype.init = function(_json){
		var ret = this.getBaseStash();
		for(var i in _json.shop){
			ret.stash.items[i] = this.createObject(_json.shop[i].unlocked,_json.shop[i].quantity);
		}
		return JSON.stringify(ret);
	};

	shopManager.prototype.getBaseStash = function() {
		return {
			"stash":{
				"items":{},
				"money":{
					"normal":{
						"gold":0,
						"silver":0,
						"bronze":0
					},
					"premium":{
						"gold":0
					}
				}
			}
		};
	};

	shopManager.prototype.createObject = function(_unlocked,_quantity){
		var unlocked = (typeof(_unlocked)=="undefined")?1:_unlocked;
		var quantity = (typeof(_quantity)=="undefined")?0:_quantity;
		return {
			"unlocked":unlocked,
			"quantity":quantity
		};
	};

	shopManager.prototype.test = function(_variable,_comparator,_value){
		try{
			
			if(eval(_variable+ _comparator +_value)){
				return true;
			}
		}catch(e){
			console.error("function Test of 'shopManager' ERROR");
			console.error(e.stack);
		}
		return false;
	};

	shopManager.prototype.saveStash = function(_stash) {
		_stash = JSON.parse(_stash);
		for(var i in _stash.stash.items){
			if(_stash.stash.items[i].quantity <= 0 && _stash.stash.items[i].unlocked == 0){
				delete _stash.stash.items[i];
			}
		}
		return JSON.stringify(_stash);
	};

	shopManager.prototype.loadStash = function(_shop,_stash) {
		var baseShop = JSON.parse(_shop);
		var _shopInited = JSON.parse(this.init(baseShop));
		_stash = JSON.parse(_stash);
		Object.assign(_shopInited.stash.items,_stash.stash.items);
		Object.assign(_shopInited.stash.money.normal,_stash.stash.money.normal);
		for(var i in _shopInited.stash.items){
			if(!baseShop.shop[i]){continue;}
			_shopInited.stash.items[i].quantity = Math.min(_shopInited.stash.items[i].quantity,baseShop.shop[i].quantityMax);
		}
		return JSON.stringify(_shopInited);
	};

/*********************************************
				Playtouch object
*********************************************/
	if(typeof(window.playtouch) != "object"){ window.playtouch = {};}
	playtouch.shopManager = new shopManager();
})();

// assign polyfill
if (typeof Object.assign != 'function') {
(function () {
Object.assign = function (target) {
	'use strict';
	if (target === undefined || target === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}

	var output = Object(target);
	for (var index = 1; index < arguments.length; index++) {
		var source = arguments[index];
		if (source !== undefined && source !== null) {
			for (var nextKey in source) {
				if (source.hasOwnProperty(nextKey)) {
				output[nextKey] = source[nextKey];
				}
			}
		}
	}
	return output;
};
})();
}