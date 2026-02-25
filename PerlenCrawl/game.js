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
class Player {
	constructor(maxHp,currHp,Dmg,x,y, alive){
		this.maxHp=maxHp
		this.currHp=currHp
		this.Dmg = Dmg;
		this.x = x;
		this.y = y;
		this.alive = alive;
	}
	getX(){
		return this.x;
	}
	setX(x){
		this.x = x;
	}
	getY(){
		return this.y;
	}
	setY(y){
		this.y = y;
	}
	getDmg(){
		return this.Dmg;
	}
	setDmg(dmg){
		this.Dmg = dmg;
		PS.uiLoader();
	}
	getMaxHp(){
		return this.maxHp;
	}
	setMaxHp(Hp){
		this.maxHp = Hp;
		PS.uiLoader();
	}
	getCurrHp(){
		return this.currHp;
	}
	setCurrHp(Hp){
		this.currHp = Hp;
		PS.uiLoader();
	}
	getAlive(){
		return this.alive;
	}
	setAlive(alive){
		this.alive = alive;
	}
}
const player = new Player(5,5,3,0,0,true);
class Enemy{
	constructor(maxHp,currHp,Dmg,x,y){
		this.maxHp=maxHp
		this.currHp=currHp
		this.Dmg = Dmg;
		this.x = x;
		this.y = y;
	}
}
class Snake extends Enemy {
	constructor(){
		super();
	}
}

var floorColor = 0xFFFFFF;
var playerData = 2;
var playerColor = 0x99ff99;
var playerSprite = "unloaded";
var snakeMaxHp = 4;
var snakeCurrHp = 4;
var snakeX = 8;
var snakeY = 8;
var snakeData = 3;
var snakeAlive = true;
var snakeSprite = "unloaded";
var snakeDMG = 2;
var chestX = 7;
var chestY = 8;
var chestData = 4;
var stairX = 9;
var stairY = 9;
var stairData = 5;
var chestClosed = true;
var floorsCleared = 0;
var chestSprite= "unloaded";
var stairSprite= "unloaded";


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
	PS.audioLoad("fx_bloop");
	PS.audioLoad("fx_wilhelm");
	PS.audioLoad("fx_swoosh");
	PS.audioLoad("fx_bloink");
	PS.audioLoad("fx_rip");
	// PS.imageLoad("Images/player.png", playerSpriteLoader);
	// PS.imageLoad("Images/snake.png",snakeSpriteLoader);
	// PS.imageLoad("Images/chest.png",chestSpriteLoader);
	// PS.imageLoad("Images/stair.png",stairSpriteLoader);
	PS.levelLoader();
	PS.uiLoader();

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
	PS.spriteMove(playerSprite, 0,0);
	PS.spriteShow(playerSprite);
};
function snakeSpriteLoader(image) {
	// an image object representing kitten.bmp
	snakeSprite = PS.spriteImage(image);
	PS.spriteMove(snakeSprite, 0,0);
	PS.spriteShow(snakeSprite);
};
function chestSpriteLoader(image) {
	// an image object representing kitten.bmp
	chestSprite = PS.spriteImage(image);
	PS.spriteMove(chestSprite, 0,0);
	PS.spriteShow(chestSprite);
};
function stairSpriteLoader(image) {
	// an image object representing kitten.bmp
	stairSprite = PS.spriteImage(image)
	PS.spriteMove(stairSprite, 0,0);
	PS.spriteShow(stairSprite);
};

PS.makeWall = function(x,y){
	PS.color(x,y, 0x6D8196);
	PS.data(x,y,1);
}

PS.makeFloor = function(x,y){
	PS.color(x,y, floorColor);
	PS.glyph(x,y,0);
	PS.data(x,y,0);
}

PS.makeChest = function(x,y){
	PS.color(x,y, 0xcccc00);
	PS.data(x,y,4);
	PS.glyph(x,y,0x26E4);
	// PS.spriteMove(chestSprite,x,y);
	// PS.spriteShow(chestSprite);
	chestX = x;
	chestY = y;
}

PS.makePlayer = function(x,y){
	PS.color(x,y,playerColor);
	PS.data(x,y,playerData);
	// PS.spriteMove(playerSprite,x,y);
	// PS.spriteShow(playerSprite);
	player.setX(x);
	player.setY(y);
}

PS.makeSnake = function(x,y){
	PS.color(x,y,floorColor);
	PS.data(x,y,snakeData);
	PS.glyph(x,y, 0x1F40D);
	// PS.spriteMove(snakeSprite,x,y);
	// PS.spriteShow(snakeSprite);
	snakeX = x;
	snakeY = y;
}

PS.chestGet = function(){
var item = PS.random(7);
if (item==1 || item==4){
	player.setDmg(player.getDmg()+1);
	PS.color(chestX,chestY, floorColor);
	PS.glyph(chestX,chestY,0x2694);
	PS.glyphFade(chestX,chestY,60);
	PS.glyphColor(chestX,chestY, floorColor);
}
else if (item==2 || item==5){
	player.setMaxHp(player.getMaxHp()+2);
	player.setCurrHp(player.getCurrHp()+2);
	PS.color(chestX,chestY, floorColor);
	PS.glyph(chestX,chestY,0x2665);
	PS.glyphFade(chestX,chestY,60);
	PS.glyphColor(chestX,chestY, floorColor);

}
else if (item==3 || item==6){
	if (player.getCurrHp()+5 > player.getCurrHp()){
		player.setCurrHp(player.getMaxHp());
	}
	else{
		player.setCurrHp(player.getCurrHp()+5);
	}
	PS.color(chestX,chestY, floorColor);
	PS.glyph(chestX,chestY,0x2665);
	PS.glyphFade(chestX,chestY,60);
	PS.glyphColor(chestX,chestY, floorColor);
}
else if (item==7){
	player.setMaxHp(player.getMaxHp()+3);
	player.setDmg(player.getDmg()+2);
	PS.color(chestX,chestY, floorColor);
	PS.glyph(chestX,chestY,0x1F41F);
	PS.glyphFade(chestX,chestY,60);
	PS.glyphColor(chestX,chestY,floorColor);
}
PS.audioPlay("fx_bloop");
}

PS.makeStair = function(x, y){
	//PS.color(x,y,0x6600ff);
	PS.data(x,y,stairData);
	PS.glyph(x,y, 0x1fa9c);
	// PS.spriteMove(stairSprite,x,y);
	// PS.spriteShow(stairSprite);
	stairX = x;
	stairY = y;
}

var levelMemory1 = 0;
var levelMemory2 = 0;
var levelMemory3 = 0;
PS.levelLoader = function() {
	// reset level
	for (var i=0; i<10;i++){
		for (var j=0;j<10;j++){
			PS.makeFloor(i,j);
		}
	}
	PS.statusText("Score: " + floorsCleared);
	var validLevel = false;
	var level = PS.random(5);
	if (level !== levelMemory1 && level !== levelMemory2) {
		validLevel = true;
	}
	snakeMaxHp = 4 + (floorsCleared/2);
	snakeDMG = 2 + (floorsCleared/3);
	snakeCurrHp = snakeMaxHp;
	snakeAlive = true;
	chestClosed = true;
	// level v1
	if (validLevel && level === 1) {
		PS.makePlayer(1, 1);
		PS.makeChest(6, 2);
		PS.makeSnake(3, 5);
		PS.makeStair(9,9);
		for (var y = 1; y < 8; y += 2) {
			for (var x = 4; x < 8; x++) {
				PS.makeWall(x, y);
			}
		}
		for (var y = 2; y < 7; y += 2) {
			for (var x = 2; x < 6; x++) {
				PS.makeWall(x, y);
			}
		}
	}
	// level v2
	if (validLevel && level === 2) {
		PS.makePlayer(0,0);
		PS.makeChest(6,2);
		PS.makeSnake(5,6);
		PS.makeStair(9,9);
		for (var i = 1; i < 10; i++){
			PS.makeWall(0,i);
		}
		for (var j = 0; j < 9; j++){
			PS.makeWall(9,j);
		}
		for (var k = 1; k <8; k++){
			PS.makeWall(2,k);
		}
		for (var l = 1; l < 7;l++){
			PS.makeWall(l,9);
		}
		for (var m = 3; m <8; m++) {
			PS.makeWall(m, 1);
		}
		for (var n = 4; n < 8; n++) {
			PS.makeWall(n, 3);
		}
		PS.makeWall(7,2);
		PS.makeWall(4,4);
		PS.makeWall(4,5);
		PS.makeWall(5,5);
		PS.makeWall(6,5);
		PS.makeWall(8,5);
		PS.makeWall(9,5);
		PS.makeWall(6,6);
		PS.makeWall(8,6);
		PS.makeWall(9,6);
		PS.makeWall(5,7);
		PS.makeWall(6,7);
		PS.makeWall(9,7);
		PS.makeWall(4,8);
		PS.makeWall(5,8);
		PS.makeWall(8,8);
		PS.makeWall(9,8);
	}
	// level v3
	if (validLevel && level === 3) {
	PS.makePlayer(0,9);
	PS.makeChest(6,0);
	PS.makeSnake(9,0);
	PS.makeStair(5,5);
	for (var i = 0; i<9;i++){
		PS.makeWall(1,i);
	}
	for (var j = 2; j < 9; j++){
		PS.makeWall(j,8);
	}
	for (var k = 2; k < 9; k++){
		PS.makeWall(8,k);
	}
	for (var l = 3; l < 8; l++){
		PS.makeWall(l,2);
	}
	for (var n = 3; n < 7; n++){
		PS.makeWall(3, n);
	}
	PS.makeWall(4,0);
	PS.makeWall(5,0);
	PS.makeWall(7,0);
	PS.makeWall(5,4);
	PS.makeWall(6,4);
	PS.makeWall(6,5);
	PS.makeWall(4,6);
	PS.makeWall(5,6);
	PS.makeWall(6,6);
	}
	// level v4
	if (validLevel && level === 4) {
	PS.makePlayer(9,9);
	PS.makeChest(9,1);
	PS.makeStair(8,3);
	PS.makeSnake(0,0);
	PS.makeWall(4,0);
	PS.makeWall(5,0);
	PS.makeWall(1,1);
	PS.makeWall(2,1);
	PS.makeWall(5,1);
	PS.makeWall(7,1);
	PS.makeWall(8,1);
	PS.makeWall(1,2);
	PS.makeWall(2,2);
	PS.makeWall(3,2);
	PS.makeWall(7,2);
	PS.makeWall(8,2);
	PS.makeWall(9,2);
	for(var i = 3; i < 8; i++){
		PS.makeWall(i,3);
	}
	PS.makeWall(9,3);
	PS.makeWall(1,4);
	PS.makeWall(4,4);
	PS.makeWall(5,4);
	PS.makeWall(6,4);
	PS.makeWall(9,4);
	PS.makeWall(1,5);
	PS.makeWall(2,5);
	PS.makeWall(8,5);
	PS.makeWall(9,5);
	PS.makeWall(2, 6);
	PS.makeWall(3,6);
	PS.makeWall(7,6);
	PS.makeWall(8,6);
	for (var j = 3; j < 8; j++){
		PS.makeWall(j,7);
	}
	PS.makeWall(4,8);
	PS.makeWall(5,8);
	PS.makeWall(6,8);
	}
	// level v5
	if (validLevel && level === 5) {
	PS.makePlayer(5,9);
	PS.makeChest(6,6);
	PS.makeSnake(3,5);
	PS.makeStair(9,5);
	PS.makeWall(7,0);
	for (var i = 1; i < 8; i++){
		PS.makeWall(i,1);
	}
	PS.makeWall(4,2);
	PS.makeWall(1,3);
	for(var j = 3; j < 8; j++){
		PS.makeWall(2,j);
	}
	for(var k = 3; k<10; k++){
		PS.makeWall(k,7);
	}
	PS.makeWall(5,4);
	PS.makeWall(5,5);
	PS.makeWall(5,6);
	PS.makeWall(7,5);
	PS.makeWall(7,6);
	PS.makeWall(8,3);
	PS.makeWall(8,4);
	PS.makeWall(8,5);
	}
	if (!validLevel){
		PS.levelLoader();
	}
	else {
		levelMemory1 = level;
		levelMemory2 = levelMemory1;
		//levelMemory3 = levelMemory2;
	}
}
var firstLoad = true;
PS.uiLoader = function() {
	if (firstLoad) {
		for (var i = 10; i < 13; i++) {
			for (var j = 0; j < 10; j++) {
				PS.makeWall(j, i);
			}
		}
		firstLoad = false;
	}
	// setup health
	var currTens = player.getCurrHp()/10;
	var currOnes = player.getCurrHp()%10;
	PS.glyph(2,11,0x2665);
	PS.glyph(3,11,(0x0030+currTens));
	PS.glyph(4,11,(0x0030+currOnes));
	PS.glyph(5,11,0x002F);
	var maxTens = player.getMaxHp()/10;
	var maxOnes = player.getMaxHp()%10;
	PS.glyph(6,11,(0x0030+maxTens));
	PS.glyph(7,11,(0x0030+maxOnes));
	//setup dmg
	var dmgTens = player.getDmg()/10;
	var dmgOnes = player.getDmg()%10;
	PS.glyph(2,12,0x2694);
	PS.glyph(3,12,(0x0030+dmgTens));
	PS.glyph(4,12,(0x0030+dmgOnes));

}

PS.gameOver = function() {
	if (!player.getAlive()){
		// for (var i=0; i<10;i++){
		// 	for (var j=0;j<10;j++){
		// 		PS.makeFloor(i,j);
		// 	}
		// }
		PS.audioPlay("fx_wilhelm");
		PS.statusText("GameOver");
	}
}

PS.moveEnemy =function(x,y){
	if (snakeAlive){
		var moved = false;
		if (y !== player.getY()) {
			if (y > player.getY() && y > 0 && PS.data(x, y - 1) !== 1 && !moved && PS.data(x,y - 1) !== chestData && PS.data(x,y - 1) !== stairData) {
				if (player.getY() === y-1 && player.getX() === x){
					player.setCurrHp(player.getCurrHp() - snakeDMG);
					PS.audioPlay("fx_bloink");
					if (player.getCurrHp() < 0){
						player.setAlive(false);
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);

				PS.makeSnake(x, y - 1);
				moved = true;
			}
			if (y < player.getY() && y < 9 && PS.data(x, y + 1) !== 1 && !moved && PS.data(x,y + 1) !== chestData && PS.data(x,y+ 1) !== stairData) {
				if (player.getY() === y+1 && player.getX() === x){
					player.setCurrHp(player.getCurrHp() - snakeDMG);
					PS.audioPlay("fx_bloink");
					if (player.getCurrHp() < 0){
						player.setAlive(false);
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);

				PS.makeSnake(x, y + 1);
				moved = true;
			}
		}
		if (x !== player.getX()) {
			if (x > player.getX() && x > 0 && PS.data(x - 1, y) !== 1 && !moved && PS.data(x - 1,y) !== chestData && PS.data(x-1,y) !== stairData) {
				if (player.getX() === x-1 && player.getY() === y){
					player.setCurrHp(player.getCurrHp() - snakeDMG);
					PS.audioPlay("fx_bloink");
					if (player.getCurrHp() < 0){
						player.setAlive(false);
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);

				PS.makeSnake(x - 1, y);
				moved = true;
			}
			if (x < player.getX() && x < 9 && PS.data(x + 1, y) !== 1 && !moved && PS.data(x+1,y) !== chestData && PS.data(x+1,y) !== stairData) {
				if (player.getX() === x+1 && player.getY() === y){
					player.setCurrHp(player.getCurrHp() - snakeDMG);
					PS.audioPlay("fx_bloink");
					if (player.getCurrHp() < 0){
						player.setAlive(false);
						PS.gameOver();
					}
					return;
				}
				PS.makeFloor(x, y);

				PS.makeSnake(x + 1, y);
				moved = true;
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
	if (playerAlive){
	if (key == PS.KEY_ARROW_UP || key == 119){
		if (player.getY() > 0 && PS.data(player.getX(),player.getY()-1) !== 1){
			if (player.getY()-1 === snakeY && player.getX() === snakeX && snakeAlive){
				snakeCurrHp -= player.getDmg();
				PS.audioPlay("fx_swoosh");
				if (snakeCurrHp <= 0){
					snakeAlive = false;
					PS.audioPlay("fx_rip");
					PS.makeFloor(snakeX, snakeY);
					PS.glyph(snakeX,snakeY, 0);
				}
			}
			else if (player.getY()-1 === chestY && player.getX() === chestX && chestClosed){
				PS.chestGet();
				chestClosed = false;
			}
			else if (player.getY()-1 === stairY && player.getX() === stairX){
				floorsCleared++;
				PS.levelLoader();
			}
			else {
				PS.makeFloor(player.getX(), player.getY());
				PS.makePlayer(player.getX(), player.getY() - 1);
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}

	else if (key == PS.KEY_ARROW_DOWN || key == 115){
		if (player.getY() < 9 && PS.data(player.getX(),player.getY()+1) !==1){
			if (player.getY()+1 === snakeY && player.getX() === snakeX && snakeAlive) {
				snakeCurrHp -= player.getDmg();
				PS.audioPlay("fx_swoosh");
				if (snakeCurrHp <= 0) {
					snakeAlive = false;
					PS.audioPlay("fx_rip");
					PS.makeFloor(snakeX, snakeY);
					PS.glyph(snakeX,snakeY, 0);
				}
			}
			else if (player.getY()+1 === chestY && player.getX() === chestX && chestClosed){
				PS.chestGet();
				chestClosed = false;
			}
			else if (player.getY()+1 === stairY && player.getX() === stairX){
				floorsCleared++;
				PS.levelLoader();
			}
			else {
				PS.makeFloor(player.getX(), player.getY());
				PS.makePlayer(player.getX(), player.getY() + 1);
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}

	else if (key == PS.KEY_ARROW_RIGHT || key == 100){
		if (player.getX() < 9 && PS.data(player.getX()+1,player.getY()) !== 1){
			if (player.getX()+1 === snakeX && player.getY() === snakeY && snakeAlive){
				snakeCurrHp -= player.getDmg();
				PS.audioPlay("fx_swoosh");
				if (snakeCurrHp <= 0){
					snakeAlive = false;
					PS.audioPlay("fx_rip");
					PS.makeFloor(snakeX, snakeY);
					PS.glyph(snakeX,snakeY, 0);
				}
			}
			else if (player.getY() === chestY && player.getX()+1 === chestX && chestClosed){
				PS.chestGet();
				chestClosed = false;
			}
			else if (player.getY() === stairY && player.getX()+1 === stairX){
				floorsCleared++;
				PS.levelLoader();
			}
			else {
				PS.makeFloor(player.getX(), player.getY());
				PS.makePlayer(player.getX() + 1, player.getY());
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}

	else if (key == PS.KEY_ARROW_LEFT || key == 97){
		if (player.getX() > 0 && PS.data(player.getX()-1,player.getY()) !== 1){
			if (player.getX()-1 === snakeX && player.getY() === snakeY && snakeAlive){
				snakeCurrHp -= player.getDmg();
				PS.audioPlay("fx_swoosh");
				if (snakeCurrHp <= 0){
					snakeAlive = false;
					PS.audioPlay("fx_rip");
					PS.makeFloor(snakeX, snakeY);
					PS.glyph(snakeX,snakeY, 0);
				}
			}
			else if (player.getY() === chestY && player.getX()-1 === chestX && chestClosed){
				PS.chestGet();
				chestClosed = false;
			}
			else if (player.getY() === stairY && player.getX()-1 === stairX){
				floorsCleared++;
				PS.levelLoader();
			}
			else {
				PS.makeFloor(player.getX(), player.getY());
				PS.makePlayer(player.getX() - 1, player.getY());
			}
		}
		PS.moveEnemy(snakeX, snakeY);
	}
	}
	else if (key == 114){
		player.setAlive(true);
		player.setMaxHp(5);
		player.setCurrHp(5);
		player.setDmg(3);
		floorsCleared = 0;
		PS.levelLoader();
		levelMemory2 = 0;
		levelMemory1 = 0;
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


