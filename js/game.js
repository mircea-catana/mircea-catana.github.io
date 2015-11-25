//function initializeCanvas() {
	var canvas = document.getElementById("canv");
	canvas.height = $(window).height() - $("#header").height();
	canvas.width = $(window).width();

	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

	if (gl) {
		gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        gl.clearColor(0.8, 0.2, 0.2, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, [
            'attribute vec2 position;',
            'void main() {',
                'gl_Position = vec4(position, 0.0, 1.0);',
            '}'
        ].join('\n'));
        gl.compileShader(vertexShader);

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, [
            'precision highp float;',
            'uniform vec4 color;',
            'void main() {',
                'gl_FragColor = color;',
            '}'
        ].join('\n'));
        gl.compileShader(fragmentShader);

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log('Link failed: ' + gl.getProgramInfoLog(program));
        }

        var vertices = new Float32Array([
            -0.5, -0.5,
            0.5, -0.5,
            0.0, 0.5
        ]);

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.useProgram(program);

        program.color = gl.getUniformLocation(program, 'color');
        gl.uniform4fv(program.color, [0.2, 0.7, 0.5, 1.0]);

        program.position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(program.position);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, vertices.length/2.0);
	} else {
		console.log("WebGL not supported");
	}
//}