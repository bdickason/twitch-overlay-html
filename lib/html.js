/* html.js - Re-usable module to display html on your stream */

var path = require('path');

var eventbus;	// Global event bus attached to HtmlOverlay object - used for passing events

module.exports = HtmlOverlay;

function HtmlOverlay(name, view, static) {
	// name - name to reference the overlay
	// view - the .pug file to render when requested
	// static - custom static directory to host videos, images, etc
	
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

	this.template = {
		name: this.name,
		view: view,
		selector: '#' + this.name,
		directory: path.join(path.dirname(view))
	};

	// Optional parameters
	if(static) {
		// Custom directory to serve static assets from
		this.template.directory = static;
	}
};
