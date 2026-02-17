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

/*
Types of blocks
Goal: objective to move yourself to
Player Character: object that is moved
Walls: obstacles
 */

var floorColor = 0xAAD4E5;
var floorData = 1;
var wallColor = 0x000000;
var wallData = 2;
var goalColor = 0xFFFFFF;
var goalData = 3;
var playerColor = 0xB99ABF;
var playerData = 4;
var gridsize = 10;
var playerPosX = 0;
var playerPosY = 0;
var playerinitX = 0;
var playerinitY = 0;
var goalPosX = 4;
var goalPosY = 1;

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

	PS.gridSize( gridsize, gridsize );
    PS.gridColor(155, 180, 191);
    PS.setPuzzle();
    PS.audioLoad("fx_swoosh");
    PS.audioLoad("fx_tada");
    //PS.statusText("R if stuck");
	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
};

PS.makeWall = function(x,y) {
    PS.color(x,y,wallColor);
    PS.data(x,y,wallData);
}

var delayer;
function movePlayer(x1,y1,x2,y2) {
    if (y1 != y2) {
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                PS.color(i, j, playerColor);
                if (PS.data(i,j) !== playerData) {
                    PS.fade(i, j, 15);
                    PS.color(i,j, floorColor);
                }
            }
        }
    }
    else if (x1 != x2){
        for (var j = y1; j <= y2; j++) {
            for (var i = x1; i <= x2; i++) {
                PS.color(i, j, playerColor);
                if (PS.data(i,j) !== playerData) {
                    PS.fade(i, j, 15);
                    PS.color(i,j, floorColor);
                }
            }
        }
    }
   // delayer = PS.timerStart(10,movePlayerHelper);
}
// // 0 = X, 1 = Y
// function movePlayerHelper(x,y,XorY) {
//     if (XorY === 0){
//         for (x; x<gridsize; x++) {
//             if (PS.data(x,y) === floorData){
//                 PS.color(x,y,floorColor);
//             }
//         }
//     }
//     else if (XorY === 1){
//         for (y; y<gridsize; y++) {
//             if (PS.data(x,y) === floorData){
//                 PS.color(x,y,floorColor);
//             }
//         }
//     }
//
//     for (var i = 0; i<gridsize;i++){
//         for (var j=0; j<gridsize; j++) {
//             if (PS.data(i,j) === floorData){
//                 PS.color(i,j,floorColor);
//             }
//         }
//     }
//     PS.timerStop(delayer);
// }

PS.setPuzzle = function() {
    // place the goal
    PS.color(4,1, goalColor);
    PS.data(4,1, goalData);
    //place the playerStart
    PS.color(playerinitX,playerinitY, playerColor);
    PS.data(playerinitX,playerinitY, playerData);
    playerPosX = playerinitX;
    playerPosY = playerinitY;
    //place the walls
    PS.makeWall(2,0);
    PS.makeWall(9, 0);
    PS.makeWall(5,1);
    PS.makeWall(0,3);
    PS.makeWall(1,3);
    PS.makeWall(9,3);
    PS.makeWall(1,7);
    PS.makeWall(2,8);
    PS.makeWall(9,8);
    PS.makeWall(7,9);


// set the floor
    for (var i = 0; i < gridsize; i++) {
        for (var j = 0; j < gridsize; j++) {
            if (PS.data(i,j) === 0){
                PS.color(i,j, floorColor);
                PS.data(i,j, floorData);
            }
        }
    }
}

PS.levelClear = function() {
    PS.audioPlay("fx_tada");
    gridsize = 16;
    PS.gridSize( gridsize, gridsize);
    PS.gridColor(155, 180, 191);
    for (var i = 0; i < gridsize; i++) {
        for (var j = 0; j < gridsize; j++) {
            PS.color(i,j, floorColor);
            PS.data(i,j, floorData);
            playerPosX = null;
            playerPosY = null;
        }
    }

    // Y
    PS.color(0,0,wallColor);
    PS.color(2,0,wallColor);
    PS.color(0,1,wallColor);
    PS.color(2,1,wallColor);
    for (var i = 2; i<5;i++){
        PS.color(1,i,wallColor);
    }
    // o
    for (var j = 5; j < 8; j++){
        PS.color(j,1,wallColor);
    }
    for (var k = 2; k<5; k++){
        PS.color(4,k,wallColor);
    }
    for (var l = 2; l<5; l++){
        PS.color(8,l,wallColor);
    }
    for (var m = 5; m<8; m++){
        PS.color(m,5,wallColor);
    }
    // u
    for (var n = 1; n < 5; n++){
        PS.color(10,n,wallColor);
    }
    PS.color(11,5,wallColor);
    PS.color(12,5,wallColor);
    for (var b = 1; b <= 5; b++){
        PS.color(13,b,wallColor);
    }
    // w
    for (var v = 7; v <10; v++){
        PS.color(0,v,wallColor);
    }
    PS.color(1,10,wallColor);
    PS.color(2,8,wallColor);
    PS.color(2,9,wallColor);
    PS.color(3,10,wallColor);
    for (var c = 7; c <10; c++){
        PS.color(4,c,wallColor);
    }
    // i
    PS.color(6,7,wallColor);
    PS.color(6,9,wallColor);
    PS.color(6,10,wallColor);
    // n
    PS.color(9,9,wallColor);
    PS.color(9,10,wallColor);
    PS.color(10,8,wallColor);
    PS.color(11,8,wallColor);
    PS.color(12,9,wallColor);
    PS.color(12,10,wallColor);
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
    /*
	PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );
    if (PS.data(x,y) === floorData) {
        PS.color(x, y, wallColor);
        PS.data(x, y, wallData);
    }
    else if (PS.data(x,y) === wallData){
        PS.color(x, y, playerColor);
        PS.data(x, y, playerData);
    }
    else if (PS.data(x,y) === playerData){
        PS.color(x, y, goalColor);
        PS.data(x, y, goalData);
    }
    else if (PS.data(x,y) === goalData){
        PS.color(x, y, floorColor);
        PS.data(x, y, floorData);
    }
    */
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
        if (playerPosY !== 0 && PS.data(playerPosX, playerPosY-1) !== 2) {
            var wallPosY;
            for (wallPosY = playerPosY-1; wallPosY > -1; wallPosY--) {
                if (PS.data(playerPosX, wallPosY) === wallData) {
                    break;
                }
            }
            PS.data(playerPosX, playerPosY, floorData);
            PS.color(playerPosX, playerPosY, floorColor);
            var initPlayerPosY = playerPosY;
            playerPosY = wallPosY+1;
            PS.color(playerPosX, playerPosY, playerColor);
            PS.data(playerPosX, playerPosY, playerData);
            movePlayer(playerPosX, playerPosY,playerPosX,initPlayerPosY);
            if (playerPosX === goalPosX && playerPosY === goalPosY) {
                PS.statusText("You Win!");
                PS.levelClear();
            }
            else {
                PS.audioPlay("fx_swoosh");
            }

        }
    }

    else if (key == PS.KEY_ARROW_DOWN || key == 115){
        if (playerPosY !== gridsize-1 && PS.data(playerPosX, playerPosY+1) !== 2) {
            var wallPosY;
            for (wallPosY = playerPosY+1; wallPosY < gridsize; wallPosY++) {
                if (PS.data(playerPosX, wallPosY) === wallData) {
                    break;
                }
            }
            PS.data(playerPosX, playerPosY, floorData);
            PS.color(playerPosX, playerPosY, floorColor);
            var initPlayerPosY = playerPosY;
            playerPosY = wallPosY-1;
            PS.color(playerPosX, playerPosY, playerColor);
            PS.data(playerPosX, playerPosY, playerData);
            movePlayer(playerPosX, initPlayerPosY, playerPosX, playerPosY);
            if (playerPosX === goalPosX && playerPosY === goalPosY) {
                PS.statusText("You Win!");
                PS.levelClear();
            }
            else {
                PS.audioPlay("fx_swoosh");
            }
        }
    }

    else if (key == PS.KEY_ARROW_LEFT || key == 97) {
        if (playerPosX !== 0 && PS.data(playerPosX - 1, playerPosY) !== 2) {
            var wallPosX;
            for (wallPosX = playerPosX - 1; wallPosX > -1; wallPosX--) {
                if (PS.data(wallPosX, playerPosY) === wallData) {
                    break;
                }
            }
            PS.data(playerPosX, playerPosY, floorData);
            PS.color(playerPosX, playerPosY, floorColor);
            var initPlayerPosX = playerPosX;
            playerPosX = wallPosX + 1;
            PS.color(playerPosX, playerPosY, playerColor);
            PS.data(playerPosX, playerPosY, playerData);
            movePlayer(playerPosX, playerPosY, initPlayerPosX, playerPosY);
            if (playerPosX === goalPosX && playerPosY === goalPosY) {
                PS.statusText("You Win!");
                PS.levelClear();
            }
            else {
                PS.audioPlay("fx_swoosh");
            }
        }
    }

    else if (key == PS.KEY_ARROW_RIGHT || key == 100){
            if (playerPosX !== gridsize-1 && PS.data(playerPosX+1, playerPosY) !== 2) {
                var wallPosX;
                for (wallPosX = playerPosX+1; wallPosX < gridsize; wallPosX++) {
                    if (PS.data(wallPosX, playerPosY) === wallData) {
                        break;
                    }
                }
                PS.data(playerPosX, playerPosY, floorData);
                PS.color(playerPosX, playerPosY, floorColor);
                var initPlayerPosX = playerPosX;
                playerPosX = wallPosX-1;
                PS.color(playerPosX, playerPosY, playerColor);
                PS.data(playerPosX, playerPosY, playerData);
                movePlayer(initPlayerPosX, playerPosY, playerPosX, playerPosY);
                if (playerPosX === goalPosX && playerPosY === goalPosY) {
                    PS.statusText("You Win!");
                    PS.levelClear();
                }
                else {
                    PS.audioPlay("fx_swoosh");
                }
            }
    }

    else if (key == 114){
        PS.data(playerPosX, playerPosY, floorData);
        PS.color(playerPosX, playerPosY, floorColor);
        PS.setPuzzle();
        PS.statusText("Puzzle Reset");
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

