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

  const TILE_WIDTH=24, TILE_HEIGHT=24;
  var numGhosts = 4;
	var ghostcolor = {};
	ghostcolor[0] = "rgba(255, 0, 0, 255)";
	ghostcolor[1] = "rgba(255, 128, 255, 255)";
	ghostcolor[2] = "rgba(128, 255, 255, 255)";
	ghostcolor[3] = "rgba(255, 128, 0,   255)";
	ghostcolor[4] = "rgba(50, 50, 255,   255)"; // blue, vulnerable ghost
	ghostcolor[5] = "rgba(255, 255, 255, 255)"; // white, flashing ghost

	// hold ghost objects
	var ghosts = {};

 	var Ghost = function(id, ctx){

		this.x = 0;
		this.y = 0;
		this.velX = 0;
		this.velY = 0;
		this.speed = 1;
		
		this.nearestRow = 0;
		this.nearestCol = 0;
	
		this.ctx = ctx;
	
		this.id = id;
		this.homeX = 0;
		this.homeY = 0;

		this.draw = function(){
  		// test10
			// Tu código aquí
    	// Pintar cuerpo de fantasma
	
			// test12 
    	// Tu código aquí
			// Asegúrate de pintar el fantasma de un color u otro dependiendo del estado del fantasma y de thisGame.ghostTimer
			// siguiendo el enunciado
      
      // test10
			// Tu código aquí
      // Pintar ojos 

		}; // draw

		this.move = function() {
			// test10
			// Tu código aquí
		};

	}; // fin clase Ghost

	// static variables
	Ghost.NORMAL = 1;
	Ghost.VULNERABLE = 2;
	Ghost.SPECTACLES = 3;

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
    	// Tu código aqui
			// leer res/levels/1.txt y guardarlo en el atributo map	
			// haciendo uso de setMapTile
    
    	// test10
			// Tu código aquí
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


		this.isWall = function(row, col) {
			// test7
			// Tu código aquí
		};


		this.checkIfHitWall = function(possiblePlayerX, possiblePlayerY, row, col){
 			// test7
      // Tu código aquí
      // Determinar si el jugador va a moverse a una fila,columna que tiene pared 
      // Hacer uso de isWall
		};

		this.checkIfHit = function(playerX, playerY, x, y, holgura){
			// test11
			// Tu código aquí	
		};


		this.checkIfHitSomething = function(playerX, playerY, row, col){
			var tileID = {
	    	'door-h' : 20,
				'door-v' : 21,
				'pellet-power' : 3,
				'pellet': 2
			};
			// test8
			// Tu código aquí
			//  Gestiona la recogida de píldoras
			
      // test9
      // Tu código aquí
      // Gestiona la recogida de píldoras de poder
      
			// test12 
      // Tu código aquí
			// Gestiona la recogida de píldoras de poder
			// (cambia el estado de los fantasmas)

		};

	}; // end Level 

	var Pacman = function() {
		this.radius = 10;
		this.x = 0;
		this.y = 0;
		this.speed = 3;
		this.angle1 = 0.25;
		this.angle2 = 1.75;
	};
  
	Pacman.prototype.move = function() {
		// test7
		// Tu código aquí
    
		// tras actualizar this.x  y  this.y... 
		// check for collisions with other tiles (pellets, etc)
		thisLevel.checkIfHitSomething(this.x, this.y, this.nearestRow, this.nearestCol);
        
		// test11
		// Tu código aquí
		// check for collisions with the ghosts
	};

	// Función para pintar el Pacman
	Pacman.prototype.draw = function(x, y) {
		// Pac Man
		// test2  
		// Tu código aquí	     
    };

	var player = new Pacman();
	for (var i=0; i< numGhosts; i++){
		ghosts[i] = new Ghost(i, canvas.getContext("2d"));
	}


	var thisGame = {
		getLevelNum : function(){
			return 0;
		},
		screenTileSize: [24, 21],
		TILE_WIDTH: 24, 
		TILE_HEIGHT: 24,
		ghostTimer: 0
	};

	var thisLevel = new Level(canvas.getContext("2d"));
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
  	// test7
		// Tu código aquí
		// LEE bien el enunciado, especialmente la nota de ATENCION que
		// se muestra tras el test 7
	};

	var updateTimers = function(){
   	// test12
		// Tu código aquí
  	// Actualizar thisGame.ghostTimer (y el estado de los fantasmas, tal y como se especifica en el enunciado)
	};

	var mainLoop = function(time){
  	//main function, called each frame 
    measureFPS(time);
     
		checkInputs();
    
    // test10
    // Tu código aquí
	  // Mover fantasmas

		player.move();
		// Clear the canvas
		clearCanvas();
   
		thisLevel.drawMap();
				
		// test10
		// Tu código aquí
	  // Pintar fantasmas
 
		player.draw();

		updateTimers();
    // call the animation loop every 1/60th of second
    requestAnimationFrame(mainLoop);
	};

	var addListeners = function(){
  	// add the listener to the main, window object, and update the states
    // test4
    // Tu código aquí
    };

	var reset = function(){
  	// test12
		// Tu código aquí
    // probablemente necesites inicializar los atributos de los fantasmas
    // (x,y,velX,velY,state, speed)
    
    // test7
    // Tu código aquí
    // Inicialmente Pacman debe empezar a moverse en horizontal hacia la derecha, con una velocidad igual a su atributo speed
    // inicializa la posición inicial de Pacman tal y como indica el enunciado
    
    // test10
    // Tu código aquí
    // Inicializa los atributos x,y, velX, velY, speed de la clase Ghost de forma conveniente
	};

	var start = function(){
		// adds a div for displaying the fps value
		fpsContainer = document.createElement('div');
		document.body.appendChild(fpsContainer);
       
		addListeners();

		reset();

		// start the animation
		requestAnimationFrame(mainLoop);
	};

	//our GameFramework returns a public API visible from outside its scope
	return {
		start: start,
    ghosts: ghosts,
    thisLevel: thisLevel
	};
};

var game = new GF();
game.start();


test('Cazando fantasmas', function(assert) {

	// ponemos un power-pellet en 16,14, justo a la derecha de donde sale Pacman
	game.thisLevel.setMapTile(16,14,3);
	// esperamos unos segundos. Se supone que Pacman recoge la píldora de poder y los fantasmas deben ponerse azules

  	var done = assert.async();
  	setTimeout(function() {
		for (var i=0; i < 4; i++){
			assert.ok( game.ghosts[i].state == 2, "Los fantasmas son vulnerables");
		}

	 done();

  }, 3000);

});



test('Cazando fantasmas (ii)', function(assert) {

	// A los 8 segundos, los fantasmas deben volver a su color original 

  	var done = assert.async();
  	setTimeout(function() {
		for (var i=0; i < 4; i++){
			assert.ok( game.ghosts[i].state == 1, "Los fantasmas vuelven a ser normales");
		}

	 done();

  }, 8000);

});



  //]]