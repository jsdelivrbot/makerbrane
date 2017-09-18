var sceneEl = document.querySelector('a-scene');

utils = function() {
    // Add 2 vec3 and return the result
    var add = function (currPosition, vec3) {
        var newPostion = new THREE.Vector3(
            currPosition.x + vec3.x,
            currPosition.y + vec3.y,
            currPosition.z + vec3.z
        );
        return newPostion;
    };
    var getDistance = function (firstVec3, secondVec3) {
        var a = firstVec3.x - secondVec3.x;
        var b = firstVec3.y - secondVec3.y;
        var c = firstVec3.z - secondVec3.z;

        // GET DISTANCE
        return Math.sqrt( a*a + b*b + c*c);
    };
    return {add:add, getDistance:getDistance}
}();

// Grid Visibility trigger
$(document).ready(function() {
    $('#gridVisibilityButton').change(function(event) {
        if (sceneEl.hasAttribute('gridHelper'))
            sceneEl.removeAttribute('gridHelper');
        else
            sceneEl.setAttribute('gridHelper','');
    });
});

//// FOCUSING ELEMENTS

// Tracking the keys that's being pressed
keys = function() {
    keysPressed = [];
    const add= function(e) {
        keysPressed[e.keyCode] = true;
    };
    const remove = function(e) {
        delete keysPressed[e.keyCode];
    };
    return {add:add, remove:remove}
}();

window.addEventListener('keydown', keys.add, false);
window.addEventListener('keyup', keys.remove, false);
