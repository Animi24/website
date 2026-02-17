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
var wallColor = 0x003C8C;
var wallData = 2;
var goalColor = 0xFFFFFF;
var goalData = 3;
var goalGlyph = 0x2690;
var playerColor = 0xB99ABF;
var playerData = 4;
var pathColor = 0x4d6df3;
var pathData = 5;
var gridsize = 10;
var playerPosX = 0;
var playerPosY = 0;
var playerinitX = 0;
var playerinitY = 0;
var goalPosX = 4;
var goalPosY = 1;
var currentLevel = 0;

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
    PS.levelManager();
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

PS.makeGoal = function(x,y) {
    PS.color(x,y,goalColor);
    PS.data(x,y,goalData);
    PS.glyph(x,y,goalGlyph);
    goalPosX = x;
    goalPosY = y;
}

PS.makePlayer = function(x,y) {
    PS.color(x,y,playerColor);
    PS.data(x,y,playerData);
}

PS.makePath = function(x,y) {
    PS.color(x,y,pathColor);
    PS.data(x,y,pathData);
}

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
}


PS.levelManager = function(){
    if (currentLevel === 0) {
        PS.statusText("Level 1");
        PS.setLevel0();
    }

    else if (currentLevel === 1) {
        PS.statusText("Level 2");
        PS.audioPlay("fx_tada");
        gridsize = 12;
        PS.gridSize( gridsize, gridsize);
        PS.gridColor(155, 180, 191);
        PS.setLevel1();
    }

    else if (currentLevel === 2) {
        PS.statusText("Level 3");
        PS.audioPlay("fx_tada");
        PS.setLevel2();
    }

    else if (currentLevel === 3) {
        PS.statusText("Level 4");
        PS.audioPlay("fx_tada");
        gridsize = 16;
        PS.gridSize( gridsize, gridsize);
        PS.gridColor(155, 180, 191);
        PS.setLevel3();
    }

    else {
    PS.gameWin();
    }
}

PS.setLevel0 = function() {
    // place the goal
    PS.makeGoal(4,1);
    //place the playerStart
    PS.makePlayer(playerinitX,playerinitY);
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

PS.setLevel1 = function() {
    // reset the board
    for (var i = 0; i < gridsize; i++) {
        for (var j = 0; j < gridsize; j++) {
                PS.color(i,j, floorColor);
                PS.data(i,j, floorData);
                PS.glyph(i,j, 0);
        }
    }
    // place the goal
    PS.makeGoal(6,0);
    // set the player
    PS.makePlayer(4,0);
    playerPosX = 4;
    playerPosY = 0;
    // set the walls
    PS.makeWall(5,0);
    PS.makeWall(7,0);
    PS.makeWall(10,0);
    PS.makeWall(1,1);
    PS.makeWall(10,1);
    PS.makeWall(9,2);
    PS.makeWall(9,3);
    PS.makeWall(4,3);
    PS.makeWall(8,4);
    PS.makeWall(1,5);
    PS.makeWall(2,5);
    PS.makeWall(3,5);
    PS.makeWall(10,5);
    PS.makeWall(5,6);
    PS.makeWall(11,6);

    PS.makeWall(5,8);

    PS.makeWall(0,9);
    PS.makeWall(1,9);
    PS.makeWall(5,9);
    PS.makeWall(9,10);
    PS.makeWall(2,11);
    PS.makeWall(9,11);

}

PS.setLevel2 = function() {
    // reset the board
    for (var i = 0; i < gridsize; i++) {
        for (var j = 0; j < gridsize; j++) {
            PS.color(i,j, floorColor);
            PS.data(i,j, floorData);
            PS.glyph(i,j, 0);
        }
    }
    // make goal
    PS.makeGoal(9,9);
    // set player
    PS.makePlayer(1,0);
    playerPosX = 1;
    playerPosY = 0;
    // set walls and paths
    PS.makeWall(0,2);
    PS.makePath(4, 2);
    PS.makeWall(9,2);
    PS.makeWall(1,3);
    PS.makeWall(8,3);
    PS.makeWall(7,4);
    PS.makeWall(3,5);
    PS.makeWall(4,5);
    PS.makeWall(5,5);
    PS.makeWall(10,5);
    PS.makeWall(11,5);
    PS.makeWall(9,6);
    PS.makeWall(10,6);
    PS.makeWall(2,7);
    PS.makeWall(4,7);
    PS.makePath(11,7);
    PS.makeWall(2,8);
    PS.makePath(9,8);
    PS.makeWall(2,9);
    PS.makeWall(5, 9);
    PS.makeWall(5,10);
    PS.makeWall(9,10);
}

PS.setLevel3 = function() {
    // reset the board
    for (var i = 0; i < gridsize; i++) {
        for (var j = 0; j < gridsize; j++) {
            PS.color(i,j, floorColor);
            PS.data(i,j, floorData);
            PS.glyph(i,j, 0);
        }
    }
    // set goal
    PS.makeGoal(7,0);
    // set player start
    PS.makePlayer(13,13);
    playerPosX = 13;
    playerPosY = 13;
    // set walls and paths
    PS.makeWall(6,0);
    PS.makeWall(8,0);
    PS.makeWall(12,0);
    PS.makeWall(13,0);
    PS.makeWall(14,0);
    PS.makeWall(1,1);
    PS.makeWall(2,1);
    PS.makeWall(3,1);
    PS.makeWall(1,2);
    PS.makeWall(3,2);
    PS.makeWall(9,2);
    PS.makeWall(11,2);
    PS.makeWall(12,2);
    PS.makeWall(13,2);
    PS.makePath(2,3);
    PS.makePath(7,3);
    PS.makeWall(9,3);
    PS.makeWall(9,4);
    PS.makePath(13,4);
    PS.makeWall(1,5);
    PS.makeWall(10,5);
    PS.makeWall(4,6);
    PS.makeWall(5,6);
    PS.makeWall(6,6);
    PS.makeWall(7,6);
    PS.makeWall(10,6);
    PS.makeWall(1,7);
    PS.makeWall(10,7);
    PS.makeWall(1,8);
    PS.makeWall(10,8);
    PS.makeWall(3,9);
    PS.makeWall(4,9);
    PS.makePath(8,9);
    PS.makePath(13,9);
    PS.makeWall(4,10);
    PS.makeWall(5,10);
    PS.makeWall(1,11);
    PS.makeWall(2,11);
    PS.makeWall(5,11);
    PS.makeWall(12,11);
    PS.makeWall(13,11);
    PS.makeWall(5,12);
    PS.makeWall(6,12);
    PS.makeWall(11,12);
    PS.makePath(2,13);
    PS.makeWall(9,13);
    PS.makeWall(1,14);
    PS.makeWall(2,14);
    PS.makeWall(3,14);
    PS.makeWall(8,14);
    PS.makeWall(15,14);
    PS.makeWall(14,15);
    PS.makeWall(15,15);
}

PS.gameWin = function() {
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
            var pathThere = false;
            var wallPosY;
            for (wallPosY = playerPosY - 1; wallPosY > -1; wallPosY--) {
                if (PS.data(playerPosX, wallPosY) === wallData) {
                    break;
                }
                else if (PS.data(playerPosX, wallPosY) === pathData) {
                    pathThere = true;
                    break;
                }
            }
            if (!pathThere) {
            PS.data(playerPosX, playerPosY, floorData);
            PS.color(playerPosX, playerPosY, floorColor);
            var initPlayerPosY = playerPosY;
            playerPosY = wallPosY + 1;
            PS.makePlayer(playerPosX, playerPosY);
            movePlayer(playerPosX, playerPosY, playerPosX, initPlayerPosY);
            if (playerPosX === goalPosX && playerPosY === goalPosY) {
                currentLevel++;
                PS.levelManager();
            } else {
                PS.audioPlay("fx_swoosh");
            }
        }
        else {
                PS.data(playerPosX, playerPosY, floorData);
                PS.color(playerPosX, playerPosY, floorColor);
                var initPlayerPosY = playerPosY;
                playerPosY = wallPosY;
                PS.makePlayer(playerPosX, playerPosY);
                movePlayer(playerPosX, initPlayerPosY, playerPosX, playerPosY);
                PS.audioPlay("fx_swoosh");
            }

        }
    }

    else if (key == PS.KEY_ARROW_DOWN || key == 115){
        if (playerPosY !== gridsize-1 && PS.data(playerPosX, playerPosY+1) !== 2) {
            var pathThere = false;
            var wallPosY;
            for (wallPosY = playerPosY+1; wallPosY < gridsize; wallPosY++) {
                if (PS.data(playerPosX, wallPosY) === wallData) {
                    break;
                }
                else if (PS.data(playerPosX, wallPosY) === pathData) {
                    pathThere = true;
                    break;
                }
            }
            if (!pathThere) {
                PS.data(playerPosX, playerPosY, floorData);
                PS.color(playerPosX, playerPosY, floorColor);
                var initPlayerPosY = playerPosY;
                playerPosY = wallPosY - 1;
                PS.makePlayer(playerPosX, playerPosY);
                movePlayer(playerPosX, initPlayerPosY, playerPosX, playerPosY);
                if (playerPosX === goalPosX && playerPosY === goalPosY) {
                    currentLevel++;
                    PS.levelManager();
                } else {
                    PS.audioPlay("fx_swoosh");
                }
            }
            else {
                PS.data(playerPosX, playerPosY, floorData);
                PS.color(playerPosX, playerPosY, floorColor);
                var initPlayerPosY = playerPosY;
                playerPosY = wallPosY;
                PS.makePlayer(playerPosX, playerPosY);
                movePlayer(playerPosX, initPlayerPosY, playerPosX, playerPosY);
                PS.audioPlay("fx_swoosh");
            }
        }
    }

    else if (key == PS.KEY_ARROW_LEFT || key == 97) {
        if (playerPosX !== 0 && PS.data(playerPosX - 1, playerPosY) !== 2) {
            var pathThere = false;
            var wallPosX;
            for (wallPosX = playerPosX - 1; wallPosX > -1; wallPosX--) {
                if (PS.data(wallPosX, playerPosY) === wallData) {
                    break;
                }
                else if (PS.data(wallPosX, playerPosY) === pathData) {
                    pathThere = true;
                    break;
                }
            }
            if (!pathThere) {
                PS.data(playerPosX, playerPosY, floorData);
                PS.color(playerPosX, playerPosY, floorColor);
                var initPlayerPosX = playerPosX;
                playerPosX = wallPosX + 1;
                PS.makePlayer(playerPosX, playerPosY);
                movePlayer(playerPosX, playerPosY, initPlayerPosX, playerPosY);
                if (playerPosX === goalPosX && playerPosY === goalPosY) {
                    currentLevel++;
                    PS.levelManager();
                } else {
                    PS.audioPlay("fx_swoosh");
                }
            }
        else {
                PS.data(playerPosX, playerPosY, floorData);
                PS.color(playerPosX, playerPosY, floorColor);
                var initPlayerPosX = playerPosX;
                playerPosX = wallPosX;
                PS.makePlayer(playerPosX, playerPosY);
                movePlayer(initPlayerPosX, playerPosY, playerPosX, playerPosY);
                PS.audioPlay("fx_swoosh");
            }
        }
    }

    else if (key == PS.KEY_ARROW_RIGHT || key == 100){
            if (playerPosX !== gridsize-1 && PS.data(playerPosX+1, playerPosY) !== 2) {
                var pathThere = false;
                var wallPosX;
                for (wallPosX = playerPosX+1; wallPosX < gridsize; wallPosX++) {
                    if (PS.data(wallPosX, playerPosY) === wallData) {
                        break;
                    }
                    else if (PS.data(wallPosX, playerPosY) === pathData) {
                        pathThere = true;
                        break;
                    }
                }
                if (!pathThere)
                {
                    PS.data(playerPosX, playerPosY, floorData);
                    PS.color(playerPosX, playerPosY, floorColor);
                    var initPlayerPosX = playerPosX;
                    playerPosX = wallPosX - 1;
                    PS.makePlayer(playerPosX, playerPosY);
                    movePlayer(initPlayerPosX, playerPosY, playerPosX, playerPosY);
                    if (playerPosX === goalPosX && playerPosY === goalPosY) {
                        currentLevel++;
                        PS.levelManager();
                    } else {
                        PS.audioPlay("fx_swoosh");
                    }
                }
                else {
                    PS.data(playerPosX, playerPosY, floorData);
                    PS.color(playerPosX, playerPosY, floorColor);
                    var initPlayerPosX = playerPosX;
                    playerPosX = wallPosX;
                    PS.makePlayer(playerPosX, playerPosY);
                    movePlayer(initPlayerPosX, playerPosY, playerPosX, playerPosY);
                    PS.audioPlay("fx_swoosh");
                }
            }
    }

    else if (key == 114){
        PS.data(playerPosX, playerPosY, floorData);
        PS.color(playerPosX, playerPosY, floorColor);
        PS.levelManager();
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

