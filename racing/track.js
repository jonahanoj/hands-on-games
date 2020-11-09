const TRACK_W = 40,
    TRACK_H = 40,
    TRACK_GAP = 1,
    TRACK_COLS = 20,
    TRACK_ROWS = 15;

var trackGrid =
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD = 0,
    TRACK_WALL = 1,
    TRACK_PLAYER = 2;

function trackTileToIndex(tileCol, tileRow) {
    return (tileCol + TRACK_COLS * tileRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    var trackIndex = trackTileCol + TRACK_COLS * trackTileRow;
    return (trackGrid[trackIndex] == TRACK_WALL);
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
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
            if (isWallAtTileCoord(eachCol, eachRow)) {
                var trackLeftEdgeX = eachCol * TRACK_W;
                var trackTopEdgeY = eachRow * TRACK_H;

                rect(trackLeftEdgeX, trackTopEdgeY,
                    TRACK_W - TRACK_GAP,
                    TRACK_H - TRACK_GAP,
                    'yellow');
            }
        }
    }
}