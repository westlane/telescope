/*
	Telescope v0.01 
	A Zepto & jQuery compatible plug-in for Mixpanel
	Copyright (C) 2012 Paper & Equator
*/

;(function ($) {

	var _cache = {}; // tracks data that has been sent to Mixpanel
	var _resizing; // prevents multiple resize events from firing
	var _debug = true; // log collected metrics 

	//---------------------------------------------------------------- HELPERS

	var _union = function(params) {
		var data = {};
		for (var x in params) {
			var part = _metrics[params[x]]();
			for (var y in part) {
				data[y] = part[y]; 
			}
		}
		return data;
	}

	var _track = function(event_label,event_data) {
		if (_debug) { console.log('------- ' + event_label + ' ------'); }
		for (var idx in event_data) {
			_cache[idx] = event_data[idx]; 
			if (_debug) { console.log(idx, "=", event_data[idx]); }
		}
		window.mixpanel.track(event_label,  event_data);
		if (_debug) { console.log('------ /' + event_label + ' ------'); }
	};


	//----------------------------------------------------------- USER METRICS

	var _metrics = {

		// what the user sees in her location bar
		Location: function() {
			return {"Path":window.location.pathname + window.location.hash};
		},

		// browser window width & height
		Window: function() {
			// round to the nearest...
			var r = 40; 
			var w = Math.round($(window).width()/r) * r;
			var h = Math.round($(window).height()/r) * r;
			var data = {"Window Size": w + "x" + h };
			return data;
		},

		// monitor/screen width and height
		Screen: function() {
			var w = screen.width;
			var h = screen.height;
			return {"Screen Size": w + "x" + h};
		},

		// perceived page load time in milleseconds
		Performance: function() {
			if (window.performance && window.performance.timing) {
				var now = new Date().getTime();
				var page_load_time = now - performance.timing.navigationStart;
				return {"Page Load Time": page_load_time};
			}
		}
	};

	//---------------------------------------------------------------- PLUG-IN

	$.telescope = {
		debug: function(val) {
			_debug = (val ? true : false);
		},
		hashchange: function() {
			var event_label = "window hashchange";
			var event_data = _union(['Location']);
			_track(event_label, event_data);
		},
		pageload: function() {
			var event_label = "page load"; 
			var event_data = _union(['Window', 'Location', 'Screen', 'Performance']);
			_track(event_label, event_data);
		},
		resize: function() {
			var event_label = "window resize";
			var event_data = _union(['Window', 'Screen']);
			_track(event_label, event_data);
		}
	};

	//--------------------------------------------------------------- AUTOLOAD

	$(document).ready(function($) {

		// start by recording all the basics
		$.telescope.pageload();

		// track updates to browser window size
		$(window).resize(function() {
			
			// throttle resize event
			if (_resizing) return;
			_resizing = _metrics.Window()['Window Size'];

			// avoid sending transitional dimensions (as we resize) 
			setTimeout(function() {
				var new_val = _metrics.Window()['Window Size'];
				if (_resizing != new_val) {
					$.telescope.resize();
				}
				_resizing = null;
			}, 1000);
		});
		
		// track updates to URL / hash
		$(window).on('hashchange', function() {
			$.telescope.hashchange();
		});
	});

})(window.Zepto || window.jQuery);