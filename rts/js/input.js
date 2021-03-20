function getMouse(evt) {
    var rect = canvas.getBoundingClientRect(),
        root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return { x: mouseX, y: mouseY };
}

function mouseMovedEnoughToTreatAsDrag() {
    var deltaX = lassoX1 - lassoX2;
    var deltaY = lassoY1 - lassoY2
    var dragDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return (dragDist > MIN_DIST_TO_COUNT_DRAG);
}

const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;

function getUnitUnderMouse(currentMousePos) {
    return findClosestUnitInRange(currentMousePos.x, currentMousePos.y, MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE, allUnits);
}

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

const MIN_DIST_TO_COUNT_DRAG = 10;
var selectedUnits = [];

    function mousemoveHandler(evt) {
        var mousePos = getMouse(evt);
        if (isMouseDragging) {
            lassoX2 = mousePos.x;
            lassoY2 = mousePos.y;
        }
    }

    function mousedownHandler(evt) {
        var mousePos = getMouse(evt);
        lassoX1 = mousePos.x;
        lassoY1 = mousePos.y;
        lassoX2 = lassoX1;
        lassoY2 = lassoY1;
        isMouseDragging = true;
    }

    function mouseupHandler(evt) {
        isMouseDragging = false;

        if (mouseMovedEnoughToTreatAsDrag()) {
            selectedUnits = [];

            for (var i = 0; i < playerUnits.length; i++) {
                if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
                    selectedUnits.push(playerUnits[i]);
                }
            } 
            document.getElementById('debugText').innerHTML = 'Selected ' + selectedUnits.length + ' units';
        } else {
            var mousePos = getMouse(evt);
            var clickedUnit = getUnitUnderMouse(mousePos);

            if (clickedUnit != null && clickedUnit.playerControlled == false) {
                document.getElementById('debugText').innerHTML = 'player commands ' + selectedUnits.length + ' units to attack!';
                for (var i = 0; i < selectedUnits.length; i++) {
                    selectedUnits[i].setTarget(clickedUnit);
                }
            } else {
                var unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length + 2));
                for (var i = 0; i < selectedUnits.length; i++) {
                    selectedUnits[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
                }
                document.getElementById('debugText').innerHTML = 'Moving to (' + mousePos.x + ',' + mousePos.y + ')';
            }
        }
    }