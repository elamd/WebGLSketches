
function checkKey(ev) {

	switch(ev.keyCode) {
		case 49: {
			gl.clearColor(0.3, 0.7, 0.2, 1.0);
			clear(gl);
			break;
		}
		case 50: {
			gl.clearColor(0.3, 0.2, 0.7, 1.0);
			clear(gl);
			break;
		}
		case 51: {
			var color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
			alert('clearColor = (' +
				Math.round(color[0]*10)/10 +
				',' + Math.round(color[1]*10)/10 +
				',' + Math.round(color[2]*10)/10 + ')');
			window.focus();
			break;
		}
	}
}

window.onkeydown = checkKey;