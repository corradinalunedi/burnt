var canvas  = document.createElement('canvas');
var context = canvas.getContext("2d");
var img;
var data;
var output;

function handleFile() {
  img = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
	  
  img.src = reader.result;
  decode();
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function decode() {
img.onload = function() {
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0, img.width, img.height);
	data = context.getImageData(0, 0, canvas.width, canvas.height).data;
	
	var b = data[1];
	var c1 = b;
	var c2;
	for (var i = 4, n = data.length; i < n; i += 4) {
		var newB = data[i+1];
		if(b != newB) {
			c2 = newB;
			break;
		}
	}
	var zero = Math.min(c1,c2);
	var one = Math.max(c2,c1);
	
	var buffer = new ArrayBuffer(canvas.height*canvas.width/4);
	var uint8 = new Uint8Array(buffer);
	var binString = "";
	var bitIndex=0;
	for (var i = 0, n = data.length; i < n; i += 4) {
		b = data[i+1];
		if(b == zero){
			binString += "0";
		}else if(b == one){
			binString += "1";
		}else{
			break;
		}
		if(binString.length == 8){
			byteValue = parseInt(binString, 2);
			binString = "";
			uint8.set([byteValue], bitIndex);
			bitIndex++;
		}
	}
	output = new Blob([buffer], {
        type: "image/png"
    });
	
	var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
	url = window.URL.createObjectURL(output);
    a.href = url;
    a.download = "burn7.png";
    a.click();
    window.URL.revokeObjectURL(url);
}
}