/* video.js - Re-usable module to  */

var path = require('path');
var eventbus;	// Global event bus that modules can pub/sub to
var name;			// Unique identifier and command the bot will listen for in chat
var video;		// absolute path to video. Will include 'filename' and 'directory' parameters.

var self;			// Used for scope when passing around events

module.exports = VideoOverlay;

function showVideo() {
	// When the video overlay is triggered, what video should we show?
	var response = [];

	// Load the items to show on stream
	var payload = assemblePayload();

	self.eventbus.emit(self.overlay.event, payload);
}

function assemblePayload() {
	// Put data into the proper format to be read by our stream overlay's template
	var payload = {};

	payload.video = self.video.filename;
	payload.delay = 14000;

	return(payload);
}

function VideoOverlay(options) {
	self = this;

	if(!options.video) {
		throw new Error("You must specify a Video URL");
	}
	if(!options.trigger) {
		throw new Error("You must specify a trigger to listen for in chat")
	}
	if(!options.eventbus) {
		throw new Error("You must pass in an eventemitter to listen and send events");
	}

	// Required options
	this.video = {
		filename: path.basename(options.video),
		directory: path.dirname(options.video)
	};
	this.name = options.trigger;
	this.eventbus = options.eventbus;


	// Configure Chat triggers so the bot listens for this command
	this.triggers = [{
		name: this.name,	// Command used to trigger the video
		type: options.type ? options.type : 'whisper',
		whitelist: options.whitelist ? options.whitelist : true,
		event: this.name + ':show'
	}];

	// Setup an overlay to display a house when someone gets sorted
	this.overlay = {
		name: this.name,									// The name of your overlay (for internal referral)
	  event: 'stream:' + this.name,  						// The event that shows your overlay (required)
	  view: path.join(__dirname, 'views/video.pug'),  // The view you want to be rendered (required)
	  selector: '#' + this.name,  						// The selector to select your template (optional: default to a class w/ the  .name of the overlay)
		directory: this.video.directory					// Grab the current directory
	};

	// Add event listeners from Twitch chat
	this.eventbus.on(this.triggers[0].event, showVideo);

};
