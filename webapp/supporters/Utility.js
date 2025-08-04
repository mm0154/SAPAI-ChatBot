sap.ui.define(["sap/m/MessageBox"], function(MessageBox, Constants) {//, "ui/ui/supporters/Constants"
	var fnUtility = function() {};

	/*Function to determine a number is float or not*/
	fnUtility.prototype.isFloat = function(n) {
		// return Number(n) === n && n % 1 !== 0;
		return n % 1 !== 0;
	};

	return fnUtility;
}, true);