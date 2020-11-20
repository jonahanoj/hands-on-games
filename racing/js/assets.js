var carPic = document.createElement("img");
var trackPicWall = document.createElement("img");
var trackPicRoad = document.createElement("img");
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

function loadImages() {
    var imageList = [
    {varName:carPic, theFile:"player1.png"},
    {varName:trackPicRoad, theFile:"track_road.png"},
    {varName:trackPicWall, theFile:"track_wall.png"}
    ];

    picsToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {
       beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    }
}