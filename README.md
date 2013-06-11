PriorJS
=============

How to use
-----------

PriorJS is a quick and easy to use JavaScript preloader and asset manager intended for HTML5 Games.

It does not depend on any other library. It is very small and can be easily be included in a Javascript Game Engine.

If you want to add resources to your download queue:

```javascript
		
		// Resources objects
        var images = [], 
        sounds = [],
	res = {
            images: [], 
            sounds: [],
			whenDone: function() { 
                console.log('The files are now ready for use');
				console.log( Preloader );
            }
        }
		
        // Load images
        for( index = 0; index < images.length; index++ ) { 
            resources.images.push('relative-path-to-your-image');
        }

        // Load sounds
        for( index = 0; index < sounds.length; index++ ) { 
            resources.sounds.push('relative-path-to-your-sound');
        }
		
		// Call preloader
		var Preloader = new Prior.Loader(resources);
		
		// Preloader.downloadImages();
		// Preloader.downloadAudio();
		
		Preloader.startDownload();
		
```
Changelog ( 2013-06-11 )
---------
* Now you can tell to downloader to start downloading all your queueed resources, just by using startDownload(resources) method.
* Prior is now accessible outside the anonymous function.

License
-------
PriorJS is released under the MIT License (http://opensource.org/licenses/MIT)
