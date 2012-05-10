# telescope.js

made for and by designers to measure user engagement with web applications


## Why Telescope?

Analytics tools today are optimized for tracking websites and apps that have already been launched. What about a prototype or beta release where we have dozens, not thousands, of visitors to collect data from? 

Our goal is to provide a more complete picture of user engagement. We are building telescope.js to watch the nitty-gritty of in-page interactions, from clicking on AJAX tabs to filling out forms and scrolling down the page; we want to understand the rhythm and rhyme of a user's journey.


## Setup
	
Telescope is available as a plug-in for both jQuery and Zepto. For best performance we recommend including the script immediatley before the closing body tag. Telescope will run automatically when included.


			<script type="text/javascript" src="http://zeptojs.com/zepto.min.js"></script>
			<script type="text/javascript" src="javascripts/telescope.js"></script>
		</body>
	</html>

## Dependencies

### Mixpanel

Telescope uses Mixpanel to store and analyze data points. Sign up at [mixpanel.com](http://mixpanel.com) and paste in the tracking code provided here:
	
* https://mixpanel.com/docs/integration-libraries/javascript

### Zepto or jQuery
	
Be sure to include the Zepto or jQuery library before Telescope in your HTML.

* http://zeptojs.com
* http://jquery.com


## What We Look For

Here are the data points we track today:

* Window Width & Height (on page load and resize)
* Screen Width & Height
* Address Bar URL (e.g. /contact)
* Hash (e.g. #tab1, including hash changes)
* OS & Browser (provided with Mixpanel)


## Roadmap

Some ideas we have for future commits:

* Page Scrolling
* Forms
* Buttons & Links

If you see something missing that could be helpful to your design process, let us know (we are [@paperequator](http://twitter.com/paperequator) on Twitter).