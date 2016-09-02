/*
 * This script is useful to autocomplete shit.
 * Basically you need to pass an object to this method and it will print what matches with
 * the object path string you passes to this function.
 */

/**
 * Autocomplete methods and properties for an object.
 * @param opts.jsObject   The object to autocomplete.
 * @param opts.pathString Something like: object.prop1.prop2.prop3... Last property can be partial.
 * @param opts.semantic   Semantic name for the results.
 */
function ninjacomplete(opts) {
	var whatToShow = opts.pathString.split(".");

	var element = opts.jsObject;
	var lastElm = null; // actually not last, but the one before last.

	for (var i = 0; i < whatToShow.length; i++) {
		element = element[whatToShow[i]];

		if (i == whatToShow.length - 2) {
			lastElm = element;
		}
	}


	var len = 0;

	if (typeof element === "string") {
		console.log(`${opts.semantic} ${process.argv[2]}`);
		console.log(element);
	} else if (element) {
		console.log(`${opts.semantic}s for ${process.argv[2]}`);
		for (var prop in element) {
			console.log(prop);
			len++;
		}	
		console.log(`${opts.semantic}s ${len}`);
	} else {
		console.log(`${opts.semantic}s that matches with ${process.argv[2]}`);
		// If element is undefined, that means this is a kid of selector selector.<partial>
		for ( var prop in lastElm) {
			if (prop.indexOf(whatToShow[whatToShow.length - 1]) != -1) {
				console.log(prop);
				len++;
			}
		}
		console.log(`${opts.semantic}s ${len}`);
	}

}

module.exports = ninjacomplete;
