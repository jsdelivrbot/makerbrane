var sceneEl = document.querySelector('a-scene');

// Grid Visibility trigger
$(document).ready(function() {
    $('i#gridVisibilityButton').click(function(event) {
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

var focused = [];
var cusror = document.querySelector('#cursor');
cursor.addEventListener('mousedown', function (event) {
    // CTRL key
    if (!keysPressed[17]) {
        focused.forEach(function(item) {
            item.setAttribute('material', 'opacity: 0.4');
        });
        focused = [];
    }
    var el = event.detail.intersectedEl;
    if (!el)
        return 0;

    // World position
    //console.log(el.object3D.getWorldPosition());
    el.setAttribute('material', 'opacity: 1');
    focused.push(el);

    // IF 2 IS FOCUSED GET DISTANCE
    if (focused.length == 2) {
        var positionA = focused[0].getAttribute('position');
        var positionB = focused[1].getAttribute('position');

        var a = positionA.x - positionB.x;
        var b = positionA.y - positionB.y;
        var c = positionA.z - positionB.z;
        // GET DISTANCE
        //console.log(Math.sqrt( a*a + b*b + c*c));
    }
});
