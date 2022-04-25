//<![CDATA[


// Variables globales de utilidad
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

// GAME FRAMEWORK 
var GF = function() {
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

    this.setMapTile = function(row, col, newValue) {
    	// test5
      // Tu código aquí
    };

    this.getMapTile = function(row, col) {
    	// test5
      // Tu código aquí	
    };

    this.printMap = function() {
    	// test5
      // Tu código aquí
    };

    this.loadLevel = function() {
    	// test5
      // Tu código aquí
      // leer res/levels/1.txt y guardarlo en el atributo map	
      // haciendo uso de setMapTile
    };

    this.drawMap = function() {

			var TILE_WIDTH = thisGame.TILE_WIDTH;
      var TILE_HEIGHT = thisGame.TILE_HEIGHT;

      var tileID = {
       	'door-h': 20,
        'door-v': 21,
        'pellet-power': 3
      };
			// test6
      // Tu código aquí
		};

    this.isWall = function(row, col) {
    	// test7
      // Tu código aquí
    };

    this.checkIfHitWall = function(possiblePlayerX, possiblePlayerY, row, col) {
			// test7
      // Tu código aquí
      // Determinar si el jugador va a moverse a una fila,columna que tiene pared 
      // Hacer uso de isWall
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
		getLevelNum: function() {
    	return 0;
    },
    screenTileSize: [24, 21],
    TILE_WIDTH: 24,
    TILE_HEIGHT: 24
	};

  // thisLevel global para poder realizar las pruebas unitarias
	thisLevel = new Level(canvas.getContext("2d"));
  thisLevel.loadLevel(thisGame.getLevelNum());
  // thisLevel.printMap(); 

	var measureFPS = function(newTime) {
		// la primera ejecución tiene una condición especial
  	if (lastTime === undefined) {
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

 	var checkInputs = function() {
		// test4
		// Tu código aquí (reestructurado para el test7)
		
		// test7
		// Tu código aquí
		// LEE bien el enunciado, especialmente la nota de ATENCION que
		// se muestra tras el test 7
	};

	var mainLoop = function(time) {
		//main function, called each frame 
    measureFPS(time);

    checkInputs();

    player.move();
    // Clear the canvas
    clearCanvas();

    thisLevel.drawMap();

    player.draw();
    // call the animation loop every 1/60th of second
    requestAnimationFrame(mainLoop);
	};

	var addListeners = function() {
		//add the listener to the main, window object, and update the states
    // test4
    // Tu código aquí
  };

	var reset = function() {
		// test7
    // Tu código aquí
    // Inicialmente Pacman debe empezar a moverse en horizontal hacia la derecha, con una velocidad igual a su atributo speed
    // inicializa la posición inicial de Pacman tal y como indica el enunciado
	};

	var start = function() {
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
  	start: start
  };
};

var game = new GF();
game.start();


test('checkIfHitWall bien implementado', function(assert) {

  var done = assert.async();
  setTimeout(function() {
    var x = 315,
      y = 384,
      speed = 5,
      nearestRow = 16,
      nearestCol = 13;
    assert.ok(thisLevel.checkIfHitWall(x, y - speed, nearestRow, nearestCol) == true, "entrar demasiado pronto por la primera salida hacia arriba de la pos. original");
    x = 312;
    assert.ok(thisLevel.checkIfHitWall(x, y - speed, nearestRow, nearestCol) == false, "entrar OK por la primera salida hacia arriba de la pos. original");
    x = 240, y = 144, nearestRow = 6, nearestCol = 10;
    assert.ok(thisLevel.checkIfHitWall(x - speed, y, nearestRow, nearestCol) == false, "apertura horizontal superior izquierda, entrando correctamente hacia la izquierda, no hay pared");
    y = 147;
    assert.ok(thisLevel.checkIfHitWall(x - speed, y, nearestRow, nearestCol) == true, "apertura horizontal superior izquierda, entrando demasiado tarde hacia la izquierda, hay pared");
    done();
  }, 1000);

});



  //]]>