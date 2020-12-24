const ROOM_COLS = 16,
ROOM_ROWS = 12;
    

var roomGrid =
       [	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
        1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	5,	0,	1,	1,	1,	1,
        1,	0,	4,	0,	4,	0,	1,	0,	2,	0,	1,	0,	1,	4,	4,	1,
        1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	5,	1,	5,	1,	1,
        1,	1,	1,	5,	1,	1,	1,	0,	4,	0,	1,	0,	0,	0,	1,	1,
        1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	4,	0,	1,	1,
        1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,	1,
        1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	4,	0,	1,	1,
        1,	0,	1,	0,	1,	0,	1,	0,	0,	0,	1,	0,	0,	0,	1,	1,
        1,	0,	5,	0,	5,	0,	5,	0,	3,	0,	1,	1,	1,	1,	1,	1,
        1,	0,	1,	0,	1,	0,	1,	0,	0,	0,	1,	1,	1,	1,	1,	1,
        1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1];

const TILE_GROUND = 0,
    TILE_W = 50,
    TILE_H = 50,
    TILE_WALL = 1,
    TILE_PLAYER = 2,
    TILE_GOAL = 3,
    TILE_KEY = 4,
    TILE_DOOR = 5;

    function tileTypeHasTransparency(checkTileType) {
        return (checkTileType == TILE_GOAL ||
            checkTileType == TILE_KEY ||
            checkTileType == TILE_DOOR)
    }

function roomTileToIndex(tileCol, tileRow) {
    return (tileCol + ROOM_COLS * tileRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    return (roomGrid[roomTileToIndex(trackTileCol, trackTileRow)] == TILE_WALL);
}

function getTileIndexAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TILE_W;
    var tileRow = pixelY / TILE_H;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileCol < 0 || tileCol >= ROOM_COLS ||
        tileRow < 0 || tileRow >= ROOM_ROWS) {
            document.getElementById("debugText").innerHTML = 'out of bounds:' + pixelX + ',' + pixelY;
        return undefined;
     }

    var tileIndex = roomTileToIndex(tileCol, tileRow);
    return tileIndex;
}

function drawRoom() {
    var tileIndex = 0
    var tileLeftEdgeX = 0
    var tileTopEdgeY = 0
    for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {

        tileLeftEdgeX = 0;

        for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
        
            var tileTypeHere = roomGrid[tileIndex];
            if(tileTypeHasTransparency(tileTypeHere)) {
                ctx.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
            }
            ctx.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);

            tileIndex ++;
            tileLeftEdgeX += TILE_W;
        }
        tileTopEdgeY += TILE_H;
    }
}