(function() {

	var Prior = Prior || {};

	Prior.Loader = function(config) {
		this.loadedImages = {};
		this.loadedSounds = {};
		this.successes = 0;
		this.failures = 0;
		this.imageQueue = config.images || [];
		this.soundQueue = config.sounds || [];
		
		this.doneCallback = config.whenDone || Function; 
		
		return this;
	};
	
	Prior.Loader.prototype = {
		startDownload: function() {
		
			if(this.imageQueue.length !== 0) 
				this.downloadImages();
			
			if(this.soundQueue.length !== 0) 
				this.downloadAudio();
				
			else 
				this.doneCallback();
			
			return this;
		},
		
		downloadImages: function() {
			var i;
	
			for(i = 0; i < this.imageQueue.length; i+=1) {
				var self = this,
					path = this.imageQueue[i],
					img = new Image();
					
				img.addEventListener("load", function() {
					console.log("Loaded Image: " + path);
					self.successes += 1;			
					if(self.done()) self.doneCallback();
				}, false);
				
				img.addEventListener("error", function() {
					console.log("Failed to load image: " + path);
					self.failures += 1;						
					if(self.done()) self.doneCallback();
				}, false);
				
				img.src = path; 	
				this.loadedImages[path] = img; 				
			}	
			return this;
		},
		
		downloadAudio: function() {
			var i;
			
			for(i = 0; i < this.soundQueue.length; i+=1) {
				var self = this,
					path = this.soundQueue[i],
					audio = new Audio();
					
				audio.addEventListener("canplaythrough", function() {
					console.log("Loaded Audio: " + path);
					self.successes += 1;
					if(self.done()) self.doneCallback();
				}, false);
				
				audio.addEventListener("error", function() {
					console.log("Failed to load audio: " + path);
					self.failures += 1;
					if(self.done()) self.doneCallback();
				}, false);
				
				audio.src = path;
				this.loadedSounds[path] = audio;
				
			}

			return this;
		},
		
		image: function(path) {
			return (this.loadedImages[path] ? this.loadedImages[path] : null);
		},
		
		sound: function(path) {
			return (this.loadedSounds[path] ? this.loadedSounds[path] : null);
		},
		
		done: function() {
			return (this.successes + this.failures === this.imageQueue.length + this.soundQueue.length);
		}
	};	
})();
	
