/* html.js - Re-usable module to display html on your stream */

var path = require('path');

var eventbus;	// Global event bus attached to HtmlOverlay object - used for passing events

module.exports = HtmlOverlay;

function HtmlOverlay(name, view, static) {
	// this.name;
	// this.;
	// this.static;

	var self;			// Used for scope when passing around events
	self = this;

	if(!name) {
		throw new Error("You must specify a name for this overlay")
	}
	if(!view) {
		throw new Error("You must specify a .pug view");
	}

	// Required parameters
	this.name = name;											// Unique identifier for event listeners
	this.view = view 												// absolute path to view.

	this.template = {
		name: this.name,
		view: path.join(__dirname, view),
		selector: '#' + this.name
	};

	// Optional parameters
	if(static) {
		this.static = static;
		this.template.static = static;
	}

	// this.payload = {											// What data do we deliver when the overlay is shown?
		// video: this.video.filename
	// }
};
