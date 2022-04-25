//<![CDATA[


// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;


// GAME FRAMEWORK 
var GF = function(){
	// variables para contar frames/s, usadas por measureFPS
	var frameCount = 0;
	var lastTime;
  var fpsContainer;
  var fps; 
 
    //  variable global temporalmente para poder testear el ejercicio
	inputStates = {};

	var Level = function(ctx) {
		this.ctx = ctx;
		this.lvlWidth = 0;
		this.lvlHeight = 0;
		
		this.map = [];
		
		this.pellets = 0;
		this.powerPelletBlinkTimer = 0;

		this.setMapTile = function(row, col, newValue){
			// test5
    	// Tu código aquí
		};

		this.getMapTile = function(row, col){
  		// test5
			// Tu código aquí	
		};

		this.printMap = function(){
  		// test5
			// Tu código aquí
		};

		this.loadLevel = function(){
			// test5
			// Tu código aquí
			// leer res/levels/1.txt y guardarlo en el atributo map	
			// haciendo uso de setMapTile
		};

		this.drawMap = function(){

			var TILE_WIDTH = thisGame.TILE_WIDTH;
			var TILE_HEIGHT = thisGame.TILE_HEIGHT;

			var tileID = {
				'door-h' : 20,
				'door-v' : 21,
				'pellet-power' : 3
			};
			// test6
			// Tu código aquí
		};

	}; // end Level 

	var Pacman = function() {
		this.radius = 10;
		this.x = 0;
		this.y = 0;
		this.speed = 5;
		this.angle1 = 0.25;
		this.angle2 = 1.75;
	};
	Pacman.prototype.move = function() {
		// test4
		// Tu código aquí
	};
  
	// Función para pintar el Pacman
	Pacman.prototype.draw = function(x, y) {       
		// Pac Man
		// test2
		// Tu código aquí
    // ojo: en el test2 esta función se llama drawPacman(x,y))
 	};

	var player = new Pacman();

	var thisGame = {
		getLevelNum : function(){
			return 0;
		},
		screenTileSize: [24, 21],
		TILE_WIDTH: 24, 
		TILE_HEIGHT: 24
	};

	// thisLevel global para poder realizar las pruebas unitarias
	thisLevel = new Level(canvas.getContext("2d"));
	thisLevel.loadLevel( thisGame.getLevelNum() );
	// thisLevel.printMap(); 

	var measureFPS = function(newTime){
		// la primera ejecución tiene una condición especial
		if(lastTime === undefined) {
			lastTime = newTime; 
			return;
		}

		// calcular el delta entre el frame actual y el anterior
		var diffTime = newTime - lastTime; 

		if (diffTime >= 1000) {
			fps = frameCount;    
			frameCount = 0;
			lastTime = newTime;
		}

		// mostrar los FPS en una capa del documento
		// que hemos construído en la función start()
		fpsContainer.innerHTML = 'FPS: ' + fps; 
		frameCount++;
	};

	// clears the canvas content
	var clearCanvas = function() {
		ctx.clearRect(0, 0, w, h);
	};

	var checkInputs = function(){
		// test4
		// Tu código aquí	
	};
 
	var mainLoop = function(time){
		 //main function, called each frame 
		measureFPS(time);
     
		checkInputs();
 
		// Clear the canvas
		clearCanvas();
   
		thisLevel.drawMap();

		player.move();
 
		player.draw();
		// call the animation loop every 1/60th of second
		requestAnimationFrame(mainLoop);
	};

	var addListeners = function(){
		//add the listener to the main, window object, and update the states
		// test4
		// Tu código aquí
	};

	var start = function(){
		// adds a div for displaying the fps value
		fpsContainer = document.createElement('div');
		document.body.appendChild(fpsContainer);
       
		addListeners();

		player.x = 0;
		player.y = 0; 
		player.velY = 0;
		player.velX = player.speed;
 
		// start the animation
		requestAnimationFrame(mainLoop);
	};

	//our GameFramework returns a public API visible from outside its scope
	return {
		start: start
	};
};


var game = new GF();
game.start();

test('Mapa correctamente dibujado en pantalla', function(assert) {

  	var done = assert.async();
  	setTimeout(function() {


	     	   assert.pixelEqual( canvas,  35,35, 0, 0, 255, 255,"esquina superior izquierda azul"); 
	     	   assert.pixelEqual( canvas, 250,35, 0, 0, 0, 0,"puerta superior negra");
	     	   assert.pixelEqual( canvas, 465,35, 0, 0, 255, 255,"esquina superior derecha azul");
	     	   assert.pixelEqual( canvas, 58,58, 255, 255, 255,255,"primera pi'ldora esquina superior izquierda blanca");
	     	   assert.pixelEqual( canvas, 58,82, 255, 0,0,255,"pi'ldora de poder esquina superior izquierda roja");
	     	   assert.pixelEqual( canvas, 442,82, 255, 0,0,255,"pi'ldora de poder esquina superior derecha roja");

	     	   assert.pixelEqual( canvas, 35,300, 0, 0,0,0 ,"puerta lateral izquierda negra");
	     	   assert.pixelEqual( canvas, 252,300, 0, 0,0, 255,"centro de casa de los fantasmas negro");
	     	   assert.pixelEqual( canvas, 482, 300, 0, 0,0, 0,"puerta lateral derecha negra");
		
		   assert.pixelEqual( canvas, 12, 585, 0, 0,255,255,"esquina inferior izquierda azul"); 
	     	   assert.pixelEqual( canvas, 60, 538, 0, 0,255,255,"cuadrado interior esquina inferior izquierda azul");
	     	   assert.pixelEqual( canvas, 250,538, 255, 255,255,255,"pi'ldora central lateral inferior blanca");
	     	   assert.pixelEqual( canvas, 442,538, 0, 0,255,255,"cuadrado interior esquina inferior derecha azul");
		   assert.pixelEqual( canvas, 488,582, 0, 0,255,255,"esquina inferior derecha azul"); 

    		   done();
  }, 1000);

});



  //]]>