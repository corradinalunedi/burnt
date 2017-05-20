/*function el(id){return document.getElementById(id);} // Get elem by ID

var data;
var canvas  = document.createElement('canvas');
var context = canvas.getContext("2d");
var zero;
var one;

var buffer;
var uint8;

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.onload = function() {
			 canvas.width = img.width;
			 canvas.height = img.height;
			 context.drawImage(img, 0, 0, img.width, img.height);
			};
           img.src = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
    }
	data = context.getImageData(0, 0, canvas.width, canvas.height).data;
}
	/*/DO STUFF HERE
	
	// Loop over each pixel.
	var y = (0.2126 * data[0]) + (0.7152 * data[1]) + (0.0722 * data[0]);
	var c1 = y;
	var c2;
	for (var i = 4, n = data.length; i < n; i += 4) {
		newY = (0.2126 * data[i]) + (0.7152 * data[i+1]) + (0.0722 * data[i+2]);
		if(y != newY) {
			c2 = newY;
			break;
		}
	}
	zero = Math.min(c1, c2);
	one = Math.max(c1, c2);
	buffer = new ArrayBuffer(canvas.height*canvas.width/4);
	uint8 = new Uint8Array(buffer);
	var bitIndex = 0;
	for (var i = 0, n = data.length; i < n; i += 4) {
		var byteArray = [];
		y = (0.2126 * data[i]) + (0.7152 * data[i+1]) + (0.0722 * data[i+2]);
		if (y == zero) {
			byteArray.push("0");
		}else{
			byteArray.push("1");
		}
		console.log(byteArray);
		if(bitstring+) {
			var str = byteArray.toString()
			//uint8.set(, bitIndex);
			//byteArray = [];
		}
	}
	//console.log(uint8);
}*/

el("fileinput").addEventListener("change", readImage, false);()