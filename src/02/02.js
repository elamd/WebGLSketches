var gl 	     = null;
var prg		 = null;
var c_width  = 0;
var c_height = 0;
var squareVertexBuffer = null; //The vertex buffer for the square
var squareIndexBuffer = null; // The index buffer for the square
	
var indices = []; //JavaScript array to store the indices of the square
var vertices = []; //JavaScript array to store the vertices of the square

function init() {

	gl = getGLContext();
	var fgShader = utils.getShader(gl, "shader-fs");
	var vxShader = utils.getShader(gl, "shader-vs");

	prg = gl.createProgram();
	gl.attachShader(prg, vxShader);
	gl.attachShader(prg, fgShader);
	gl.linkProgram(prg);

	if(!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
		alert("Could not initialize shaders");
	}

	gl.useProgram(prg);
	prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");
}

function initBuffers() {
	vertices =  [
		-0.5,0.5,0.0, 	//Vertex 0
		-0.5,-0.5,0.0, 	//Vertex 1
		0.5,-0.5,0.0, 	//Vertex 2
		0.5,0.5,0.0]; 	//Vertex 3

	indices = [0,3];

	squareVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	squareIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function drawScene() {
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, c_width, c_height);

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(prg.vertexPosition);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.drawElements(gl.POINTS, indices.length, gl.UNSIGNED_SHORT,0);
}

function renderLoop() {
	utils.requestAnimFrame(renderLoop);
	drawScene();
}

function runWebGLApp() {
	gl = utils.getGLContext('canvas-element-id');
	init();
	initBuffers();
	renderLoop();
}