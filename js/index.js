// const { Vector3 } = require("three");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.background = null;
scene.add( cube );

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;

const canvas = document.getElementById("bg");
const renderer = new THREE.WebGLRenderer({ 
	// alpha: true,
	canvas: canvas
});
renderer.setClearColor(new THREE.Color(0x1e1e1e));

const canvasW = canvas.getBoundingClientRect().width;
const canvasH = canvas.getBoundingClientRect().height;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( canvasW, canvasH );

// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();