
	/**
	 * Release date: August 5, 2021
	 */

	var RuptionARPlugin = function() {


        /**
         *  Start-up configuration: camera position (front or back).
         */
        this.CameraPositionUndefined = 0;
        this.CameraPositionFront     = 1;
        this.CameraPositionBack      = 2;

        /**
         *  Start-up configuration: camera focus range restriction (for iOS only).
         */
        this.CameraFocusRangeNone = 0;
        this.CameraFocusRangeNear = 1;
        this.CameraFocusRangeFar  = 2;
	};


	/*
	 *	=============================================================================================================================
	 *
	 *	PUBLIC API
	 *
	 *	=============================================================================================================================
	 */

	
    RuptionARPlugin.prototype.requestAccess = function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "RuptionARPlugin", "requestAccess", []);
    };

	
	RuptionARPlugin.prototype.loadWorld = function(successCallback, errorCallback) {

		cordova.exec(successCallback, errorCallback, "RuptionARPlugin", "open", []);

		

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


	
	

	
	/*
	 *	=============================================================================================================================
	 *
	 *	Callbacks of public functions
	 *
	 *	=============================================================================================================================
	 */


	/* Lifecycle updates */
	/**
	 *	This function gets called every time the application did become active.
	 */
	RuptionARPlugin.prototype.onResume = function() {

		// Call the Wikitude SDK that it should resume.
		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "onResume", [""]);
	};

	/* Lifecycle updates */
	/**
	 *	This function gets called when the application goes back to main
	 */
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

	/**
	 *	This function gets called every time the application is about to become inactive.
	 */
	RuptionARPlugin.prototype.onPause = function() {

		// Call the Wikitude SDK that the application did become inactive
		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "onPause", [""]);
	};

	RuptionARPlugin.prototype.isOpen = function() {

		// Call the Wikitude SDK that the application did become inactive
		cordova.exec(this.onRuptionAROK, this.onRuptionARError, "RuptionARPlugin", "isOpen", [""]);
	};

	/**
	 *	A generic success callback used inside this wrapper.
	 */
	RuptionARPlugin.prototype.onRuptionAROK = function() {};

	/**
	 *  A generic error callback used inside this wrapper.
	 */
	RuptionARPlugin.prototype.onRuptionARError = function() {};



	/* Export a new WikitudePlugin instance */
	/*var wikitudePlugin = new WikitudePlugin();
	module.exports = wikitudePlugin;*/

	// Installation constructor that binds WkitudePlugin to window
	RuptionARPlugin.install = function () {
		if (!window.plugins) {
			window.plugins = {};
		}
		window.plugins.ruptionARPlugin = new RuptionARPlugin();
		return window.plugins.ruptionARPlugin;
	};
	cordova.addConstructor(RuptionARPlugin.install);
