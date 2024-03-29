var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
var trackPics = [];
var picsToLoad = 0;

function countLoadedImage() {
    picsToLoad-=1;
    if (picsToLoad === 0) {
        loadingDone();        
    }    
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImage;
    imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
    var imageList = [
    {varName:carPic, theFile:"player1.png"},
    {varName:car2Pic, theFile:"player2.png"},

    {trackType:TRACK_ROAD, theFile:"track_road.png"},
    {trackType:TRACK_WALL, theFile:"track_wall.png"},
    {trackType:TRACK_GOAL, theFile:"track_goal.png"},
    {trackType:TRACK_TREE, theFile:"track_tree.png"},
    {trackType:TRACK_FLAG, theFile:"track_flag.png"},
    {trackType:TRACK_BOOST, theFile:"track_boost.png"},
    {trackType:TRACK_DIRTY, theFile:"track_dirty.png"}
    ];

    picsToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {
        if(imageList[i].trackType != undefined) {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        } else {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        }
    }
}