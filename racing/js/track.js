const TRACK_W = 40,
    TRACK_H = 40,
    TRACK_COLS = 20,
    TRACK_ROWS = 15;

var trackGrid =
       [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
        1, 2, 2, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
        1, 1, 5, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD = 0,
    TRACK_WALL = 1,
    TRACK_PLAYER = 2,
    TRACK_GOAL = 3,
    TRACK_TREE = 4,
    TRACK_FLAG = 5;

function trackTileToIndex(tileCol, tileRow) {
    return (tileCol + TRACK_COLS * tileRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    return (trackGrid[trackTileToIndex(trackTileCol, trackTileRow)] == TRACK_WALL);
}

function checkForTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TRACK_W;
    var tileRow = pixelY / TRACK_H;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileCol < 0 || tileCol >= TRACK_COLS ||
        tileRow < 0 || tileRow >= TRACK_ROWS) {
        return false;
    }

    var trackIndex = trackTileToIndex(tileCol, tileRow);
    return (trackGrid[trackIndex] == TRACK_ROAD);
}

function drawTracks() {
    var trackIndex = 0
    var trackLeftEdgeX = 0
    var trackTopEdgeY = 0
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {

        trackLeftEdgeX = 0;

        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        
            var trackTypeHere = trackGrid[trackIndex];
            ctx.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);

            trackIndex ++;
            trackLeftEdgeX += TRACK_W;
        }
        trackTopEdgeY += TRACK_H;
    }
}