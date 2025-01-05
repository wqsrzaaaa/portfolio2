AOS.init();




const menuIcon = document.getElementById('menu-icon');
const menuPage = document.getElementById('menu-page');
const closeMenu = document.getElementById('close-menu');

menuIcon.addEventListener('click', () => {
    menuPage.style.left = '0%';
    menuPage.style.transition = '.4s';
});

closeMenu.addEventListener('click', () => {
    menuPage.style.left = '-100%'; 
    menuPage.style.transition = '.4s'; 
});

const swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function () {
            updateShader();
        },
    },
});

const canvas = document.getElementById('waveCanvas');
const gl = canvas.getContext('webgl');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Vertex shader
const vertexShaderSource = `
    attribute vec4 a_position;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = a_position;
        v_texCoord = a_position.xy * 0.5 + 0.5;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform float u_time;

    void main() {
        float wave = sin(v_texCoord.y * 10.0 + u_time) * 0.05;
        gl_FragColor = vec4(v_texCoord.x, v_texCoord.y + wave, 1.0, 1.0);
    }
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1,
]);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "a_position");
const timeLocation = gl.getUniformLocation(program, "u_time");

// Render loop
function render(time) {
    time *= 0.001;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(timeLocation, time);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);

function updateShader() {

}

