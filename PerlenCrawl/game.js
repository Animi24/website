/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

//const playerImage = PS.imageLoad("player.png", PS.debug("image Loaded"));
var playerMaxHp = 5;
var playerCurrHp = 5;
var playerDMG = 3;
var playerX = 0;
var playerY = 0;
var playerData = 2;
var playerColor = 0x99ff99;
var playerSprite;
var playerAlive = true;
var snakeMaxHp = 4;
var snakeCurrHp = 4;
var snakeX = 8;
var snakeY = 8;
var snakeData = 3;
var snakeAlive = true;
var snakeSprite = 0xff0000;
var snakeDMG = 2;



PS.init = function( system, options ) {
	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	PS.gridSize(10,13);
	PS.gridColor(0xa3a3c2);
	PS.levelLoader();
	PS.uiLoader();
	PS.imageLoad("Images/player.bmp", playerSpriteLoader);

	//PS.spriteMove(playerSprite,0,0);

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
};

function playerSpriteLoader(image) {
	// an image object representing kitten.bmp
	playerSprite = PS.spriteImage(image);
};

PS.makeWall = function(x,y){
	PS.color(x,y, 0x6D8196);
	PS.data(x,y,1);
}

PS.makeFloor = function(x,y){
	PS.color(x,y, 0xFFFFFF);
	PS.data(x,y,0);
}

PS.makePlayer = function(x,y){
	PS.color(x,y,playerColor);
	PS.data(x,y,playerData);
	playerX = x;
	playerY = y;
}

PS.makeSnake = function(x,y){
	PS.color(x,y,snakeSprite);
	PS.data(x,y,snakeData);
	snakeX = x;
	snakeY = y;
}

PS.levelLoader = function() {
	PS.makePlayer(playerX, playerY);
	PS.makeWall(5,5);
	PS.makeWall(5,6);

	PS.makeSnake(7,7);
}

PS.uiLoader = function() {
	for (var i = 10; i < 13; i++){
		for (var j = 0; j < 10; j++) {
			PS.makeWall(j, i);
		}
	}
	// setup health
	PS.glyph()
}

PS.gameOver = function() {
	if (!playerAlive){
		for (var i=0; i<10;i++){
			for (var j=10;j<10;j++){
				PS.makeFloor(i,j);
			}
		}
		PS.statusText("GameOver");
	}
}

PS.moveEnemy =function(x,y){
	if (snakeAlive){
		if (y !== playerY) {
			if (y > playerY && y > 0 && PS.data(x, y - 1) !== 1) {
				if (playerY === y-1 && playerX === x){
					playerCurrHp -= snakeDMG;
					if (playerCurrHp < 0){
						playerAlive = false;
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);
				PS.makeSnake(x, y - 1);
			} else if (y < playerY && y < 9 && PS.data(x, y + 1) !== 1) {
				if (playerY === y+1 && playerX === x){
					playerCurrHp -= snakeDMG;
					PS.debug(playerCurrHp);
					if (playerCurrHp < 0){
						playerAlive = false;
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);
				PS.makeSnake(x, y + 1);
			}
		} else if (x !== playerX) {
			if (x > playerX && x > 0 && PS.data(x - 1, y) !== 1) {
				if (playerX === x-1 && playerY === y){
					playerCurrHp -= snakeDMG;
					PS.debug(playerCurrHp);
					if (playerCurrHp < 0){
						playerAlive = false;
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);
				PS.makeSnake(x - 1, y);
			} else if (x < playerX && x < 9 && PS.data(x + 1, y) !== 1) {
				if (playerX === x+1 && playerY === y){
					playerCurrHp -= snakeDMG;
					PS.debug(playerCurrHp);
					if (playerCurrHp < 0){
						playerAlive = false;
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);
				PS.makeSnake(x + 1, y);
			}
		}
	}
}

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:
	if (key == PS.KEY_ARROW_UP || key == 119){
		if (playerY > 0 && PS.data(playerX,playerY-1) !== 1){
			if (playerY-1 === snakeY && playerX === snakeX && snakeAlive){
				snakeCurrHp -= playerDMG;
				PS.debug(snakeCurrHp);
				if (snakeCurrHp < 0){
					snakeAlive = false;
					PS.makeFloor(snakeX, snakeY);
				}
			}
			else {
				PS.makeFloor(playerX, playerY);
				PS.makePlayer(playerX, playerY - 1);
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}

	else if (key == PS.KEY_ARROW_DOWN || key == 115){
		if (playerY < 9 && PS.data(playerX,playerY+1) !==1){
			if (playerY+1 === snakeY && playerX === snakeX && snakeAlive) {
				snakeCurrHp -= playerDMG;
				PS.debug(snakeCurrHp);
				if (snakeCurrHp < 0) {
					snakeAlive = false;
					PS.makeFloor(snakeX, snakeY);
				}
			}
			else {
				PS.makeFloor(playerX, playerY);
				PS.makePlayer(playerX, playerY + 1);
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}

	else if (key == PS.KEY_ARROW_RIGHT || key == 100){
		if (playerX < 9 && PS.data(playerX+1,playerY) !== 1){
			if (playerX+1 === snakeX && playerY === snakeY && snakeAlive){
				snakeCurrHp -= playerDMG;
				PS.debug(snakeCurrHp);
				if (snakeCurrHp < 0){
					snakeAlive = false;
					PS.makeFloor(snakeX, snakeY);
				}
			}

			else {
				PS.makeFloor(playerX, playerY);
				PS.makePlayer(playerX + 1, playerY);
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}

	else if (key == PS.KEY_ARROW_LEFT || key == 97){
		if (playerX > 0 && PS.data(playerX-1,playerY) !== 1){
			if (playerX-1 === snakeX && playerY === snakeY && snakeAlive){
				snakeCurrHp -= playerDMG;
				PS.debug(snakeCurrHp);
				if (snakeCurrHp < 0){
					snakeAlive = false;
					PS.makeFloor(snakeX, snakeY);
				}
			}
			else {
				PS.makeFloor(playerX, playerY);
				PS.makePlayer(playerX - 1, playerY);
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}
	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

