//slider

var slider = document.getElementById("myRange");

$(function() {
	var sliderHeight =  (window.innerHeight*0.8		);
	$('.slider').css('width', sliderHeight);
    $('.slidecontainer').css('left', ((sliderHeight/2*-1)+20));

	});



//create scene
var scene = new THREE.Scene();
//Create camera properties= ( FOV, aspect ratio, near plane, far plane)
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 10;
camera.position.x = 0;


var renderer = new THREE.WebGLRenderer({antialias:true});
//background colour
renderer.setClearColor("#e5e5e5");
//renderer size window
renderer.setSize(window.innerWidth,window.innerHeight);

//create our canvas element with the render settings
document.body.appendChild(renderer.domElement);
//orbit
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 1;
controls.enablePan = false;



//responding to window size changes
window.addEventListener('resize', ()=> {
	renderer.setSize(window.innerWidth,window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;

	camera.updateProjectionMatrix();

	//slider responding to windpw size
	$('.slider').css('width', (window.innerHeight*0.8));
    $('.slidecontainer').css('left', (((window.innerHeight*0.8)/2*-1)+20));

})

	var activematerial = new THREE.MeshLambertMaterial({color:0xff5454});
	var material = new THREE.MeshNormalMaterial({color:0xff5454});

	var materiallamb = new THREE.MeshLambertMaterial({color:0xff5454});


	

//create gemeotry, then material, then a mesh which joins the propertys
var cube = new THREE.BoxGeometry(10,10,10);

var mesh = new THREE.Mesh(cube,activematerial);

mesh.position.set(0,0,0)


var loader = new THREE.GLTFLoader();
loader.load('./gltf/candela.glb',handle_load);
	var candela;
	function handle_load(gltf) {
    console.log(gltf);
    candela = gltf.scene;
    console.log(candela);
    console.log(candela.children[0]);
    var candelaMesh= candela.children[0].position
    console.log(candelaMesh[0]);
    candela.children[0].material = activematerial;
	scene.add( candela );
    candela.position.z = 0;
}






//add mseh to scene 
// scene.add(mesh);



//PointLight( color,intensity, decay : Float )
var pointlight = new THREE.PointLight(0xffffff,2,100);
pointlight.position.set(20, 40, 20);
scene.add(pointlight);


// var directionalLight = new THREE.DirectionalLight( 0xffffff, 10 );
// scene.add( directionalLight );


var ambientlight = new THREE.AmbientLight( 0x404040,2);
scene.add(ambientlight);


// call the render method on the renderer
var render = function(){
	//update slider

    if (candela) {
    
        candela.rotation.y += 0.002;
        candela.position.y = (slider.value);
       		candela.children[0].material = activematerial; 
        // candela.position.x += 0.3;
    }



	//creates a loop which refreshes the screen FPS (60 times a second or whatever))
	requestAnimationFrame(render);
	// candela.rotation.y += 0.005;
	// mesh.rotation.x += 0.01;
	renderer.render(scene,camera);
}


render();

// this.tl =  new TimelineMax().delay(.3);
// this.tl =  new TimelineMax({paused:true});


// this.tl.to (this.candelaMesh.position[0] =4);
// this.tl.to (this.candelaMesh.position,1,{x:3,ease: Expo.easeOut});
// // this.tl.to (this.mesh.scale,1,{x:2,ease: Expo.easeOut});
// // this.tl.to (this.mesh.scale,1,{x:2,ease: Expo.easeOut});

document.body.addEventListener('click',() => {
	activematerial = [material, material=activematerial][0];
	console.log(activematerial);
	// this.tl.play();
// a = [b, b=a][0];

});

