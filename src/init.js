			
// Init.js
// Initialization of WebGLContext.

function getGLContext() {

	var gl = null;
	var canvas = document.getElementById("canvas-element-id");
	if( canvas == null) {
		alert("there is no canvas on this page");
		return;
	}

	var names = ["webgl", "experimental-webgl","webkit-3d","moz-webgl"];
	for (var i=0; i<names.length; ++i) {
		try {
			gl = canvas.getContext(names[i]);
		}
		catch(e) {}
		if (gl) break;
	}

	if (gl == null) {
		console.log("WebGL is not available");
	}
	else {
		console.log("woohoo!  You've got a WebGL context");
	}

	return gl;

}

function clear(ctx) {
	ctx.clear(ctx.COLOR_BUFFER_BIT);
	ctx.viewport(0,0,cWidth,cHeight);
}


function getShader(gl,id)  {
   var script = document.getElementById(id);
   if (!script) {
       return null;
   }

	var str = "";
	var k = script.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (script.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (script.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}