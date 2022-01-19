const TRACK_W = 40,
    TRACK_H = 40,
    TRACK_COLS = 20,
    TRACK_ROWS = 15;

var curlvl = 0.;
var trackGrids = [
       [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
        4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
        1, 'U', 'U', 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
        1, 1, 5, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1],

        [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
         4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
         1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
         1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
         1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
         1, 0, 0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
         1, 1, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1,
         1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
         1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
         1, 3, 3, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
         1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
         1, 1, 5, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1,
         0, 'R', 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
         0, 'R', 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
         1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1],

        [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        4, 4, 1, 1, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1,
        4, 1, 1, 1, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 3, 3, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 5, 0, 1,
        1, 5, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 1,
        1, 0, 0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 1,
        1, 0, 5, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'U', 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'L', 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
var curTrack = trackGrids[curlvl];

const TRACK_ROAD = 0,
    TRACK_WALL = 1,
    // Player represented by char U, D, L, R indicating start angle
    // TRACK_PLAYER = 2,
    TRACK_GOAL = 3,
    TRACK_TREE = 4,
    TRACK_FLAG = 5;

function trackTileToIndex(tileCol, tileRow) {
    return (tileCol + TRACK_COLS * tileRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    return (curTrack[trackTileToIndex(trackTileCol, trackTileRow)] == TRACK_WALL);
}

function getTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TRACK_W;
    var tileRow = pixelY / TRACK_H;

    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileCol < 0 || tileCol >= TRACK_COLS ||
        tileRow < 0 || tileRow >= TRACK_ROWS) {
        return TRACK_WALL;
    }

    var trackIndex = trackTileToIndex(tileCol, tileRow);
    var trackTypeHere = curTrack[trackIndex]
    if(typeof trackTypeHere == 'string') {
        trackTypeHere = TRACK_ROAD;
    }
    return trackTypeHere;
}

function drawTracks() {
    var trackIndex = 0
    var trackLeftEdgeX = 0
    var trackTopEdgeY = 0
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {

        trackLeftEdgeX = 0;

        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        
            var trackTypeHere = curTrack[trackIndex];
            if(typeof trackTypeHere == 'string') {
                trackTypeHere = TRACK_ROAD;
            }
            ctx.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);

            trackIndex ++;
            trackLeftEdgeX += TRACK_W;
        }
        trackTopEdgeY += TRACK_H;
    }
}