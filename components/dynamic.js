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
    return {add:add}
}();

AFRAME.registerComponent('dynamic', {
    schema: {
    },
    init: function() {
        var el = this.el;

        el.addEventListener('rotate', function(event) {
            var newRotation = utils.add(el.getAttribute('rotation'),
                event.detail.vec3)
            el.setAttribute('rotation', newRotation);
        });
        el.addEventListener('translate', function(event) {
            var newTransform = utils.add(el.getAttribute('position'),
                event.detail.vec3)
            el.setAttribute('position', newTransform);
        });
    }, 
    remove: function() {
        var el = this.el;

        el.removeEventListener('rotate', this.eventHandlerFn);
        el.removeEventListener('translate', this.eventHandlerFn);
    }
});


