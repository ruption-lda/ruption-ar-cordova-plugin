
	/**
	 * Release date: August 5, 2021
	 */

	/** var RuptionARPlugin = function() {

        this.CameraPositionUndefined = 0;
        this.CameraPositionFront     = 1;
        this.CameraPositionBack      = 2;

    
        this.CameraFocusRangeNone = 0;
        this.CameraFocusRangeNear = 1;
        this.CameraFocusRangeFar  = 2;
	};



	
    RuptionARPlugin.prototype.requestAccess = function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "RuptionARPlugin", "requestAccess", []);
    };

	
	RuptionARPlugin.prototype.loadWorld = function(successCallback, errorCallback) {

		cordova.exec(successCallback, errorCallback, "RuptionARPlugin", "open", []);
		alert("Test");

		

		// We add an event listener on the resume and pause event of the application life-cycle
		document.addEventListener("resume", this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
		document.addEventListener("backbutton", this.onBackButton, false);
	};

	
	RuptionARPlugin.prototype.close = function() {

		document.removeEventListener("pause", this.onPause, false);
		document.removeEventListener("resume", this.onResume, false);
		document.removeEventListener("backbutton", this.onBackButton, false);

		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "close", [""]);
	};


	
	
	RuptionARPlugin.prototype.onResume = function() {

		// Call the Wikitude SDK that it should resume.
		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "onResume", [""]);
	};

	RuptionARPlugin.prototype.onBackButton = function() {

		// Call the Wikitude SDK that it should resume.
		//cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "close", [""]);
		if (this.customBackButtonCallback != null) {
			this.customBackButtonCallback();
		}
		else {
			RuptionARPlugin.prototype.close();
		}
	};

	
	RuptionARPlugin.prototype.onPause = function() {

		// Call the Wikitude SDK that the application did become inactive
		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "onPause", [""]);
	};

	RuptionARPlugin.prototype.isOpen = function() {

		// Call the Wikitude SDK that the application did become inactive
		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "isOpen", [""]);
	};


	RuptionARPlugin.prototype.onRuptionAROK = function() {};

	RuptionARPlugin.prototype.onRuptionARError = function() {};




	// Installation constructor that binds WkitudePlugin to window
	RuptionARPlugin.install = function () {
		if (!window.plugins) {
			window.plugins = {};
		}
		window.plugins.ruptionARPlugin = new RuptionARPlugin();
		return window.plugins.ruptionARPlugin;
	};
	cordova.addConstructor(RuptionARPlugin.install);
	*/

// Empty constructor
function RuptionARPlugin() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'
RuptionARPlugin.prototype.show = function(message, duration, successCallback, errorCallback) {
  cordova.exec(successCallback, errorCallback, 'RuptionARPlugin', 'open', []);
}

// Installation constructor that binds RuptionARPlugin to window
RuptionARPlugin.install = function() {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.ruptionARPlugin = new RuptionARPlugin();
  return window.plugins.ruptionARPlugin;
};
cordova.addConstructor(RuptionARPlugin.install);

