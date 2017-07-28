(function() {
	var PNG = require('pngjs').PNG;
	var parseColor = require('parse-color');

	// The random number is a js implementation of the Xorshift PRNG
	var randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

	function seedrand(seed) {
		for (var i = 0; i < randseed.length; i++) {
			randseed[i] = 0;
		}
		for (var i = 0; i < seed.length; i++) {
			randseed[i%4] = ((randseed[i%4] << 5) - randseed[i%4]) + seed.charCodeAt(i);
		}
	}

	function rand() {
		// based on Java's String.hashCode(), expanded to 4 32bit values
		var t = randseed[0] ^ (randseed[0] << 11);

		randseed[0] = randseed[1];
		randseed[1] = randseed[2];
		randseed[2] = randseed[3];
		randseed[3] = (randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8));

		return (randseed[3]>>>0) / ((1 << 31)>>>0);
	}

	function createColor() {
		//saturation is the whole color spectrum
		var h = Math.floor(rand() * 360);
		//saturation goes from 40 to 100, it avoids greyish colors
		var s = ((rand() * 60) + 40) + '%';
		//lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
		var l = ((rand()+rand()+rand()+rand()) * 25) + '%';

		var color = 'hsl(' + h + ',' + s + ',' + l + ')';
		return color;
	}

	function createImageData(size) {
		var width = size; // Only support square icons for now
		var height = size;

		var dataWidth = Math.ceil(width / 2);
		var mirrorWidth = width - dataWidth;

		var data = [];
		for(var y = 0; y < height; y++) {
			var row = [];
			for(var x = 0; x < dataWidth; x++) {
				// this makes foreground and background color to have a 43% (1/2.3) probability
				// spot color has 13% chance
				row[x] = Math.floor(rand()*2.3);
			}
			var r = row.slice(0, mirrorWidth);
			r.reverse();
			row = row.concat(r);

			for(var i = 0; i < row.length; i++) {
				data.push(row[i]);
			}
		}

		return data;
	}

	function buildOpts(opts) {
		var newOpts = {};

		newOpts.size = opts.size || 8;
		newOpts.scale = opts.scale || 4;
		newOpts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

		seedrand(newOpts.seed);

		newOpts.color = opts.color || createColor();
		newOpts.bgcolor = opts.bgcolor || createColor();
		newOpts.spotcolor = opts.spotcolor || createColor();

		return newOpts;
	}

	function createIcon(opts) {
		var opts = buildOpts(opts || {});

		var imageData = createImageData(opts.size);
		var width = Math.sqrt(imageData.length);

		var bgColor = parseColor(opts.bgcolor).rgb;
		var fgColor = parseColor(opts.color).rgb;
		var spotColor = parseColor(opts.spotcolor).rgb;

		var imageWidth = opts.size * opts.scale;

		var png = new PNG({
			width: imageWidth,
			height: imageWidth,
			colorType: 2
		});

		for(var i = 0; i < imageData.length; i++) {
			// if data is 0, leave the background
			var row = Math.floor(i / width);
			var col = i % width;
			var idx = ((row * opts.size * opts.scale) + col) * opts.scale * 4;
			var color;
			switch (imageData[i]) {
				case 0:
					color = bgColor;
					break;
				case 1:
					color = fgColor;
					break;
				default:
					color = spotColor;
			}

			for (var y = 0; y < opts.scale; y++) {
				for (var x = 0; x < opts.scale; x++) {
					const o = idx + (x + y * opts.size * opts.scale) * 4;
					png.data[o] = color[0];
					png.data[o + 1] = color[1];
					png.data[o + 2] = color[2];
					png.data[o + 3] = 255;
				}
			}
		}

		return PNG.sync.write(png, {});
  }

  function createIconAsDataURL(opts) {
    var buf = createIcon(opts)
    return 'data:image/png;base64,' + buf.toString('base64')
  }

	module.exports = {
    createBuffer: createIcon,
    createDataURL: createIconAsDataURL
	};
})();
