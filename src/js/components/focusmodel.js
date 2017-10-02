// Subscribers to the system when they get focused
// components that listens to translation and rotation events
AFRAME.registerComponent("focusmodel", {
    schema: {
        moveable: {default: true},
    },
    init: function () {
        var el = this.el;

        el.addEventListener('rotateFocused', function(event) {
            var newRotation = utils.add(el.getAttribute('rotation'),
                event.detail.vec3)
            el.setAttribute('rotation', newRotation);
        });
        el.addEventListener('translateFocused', function(event) {
            var newTransform = utils.add(el.getAttribute('position'),
                event.detail.vec3)
            el.setAttribute('position', newTransform);
        });
    },
    // remove event Listeners
    remove: function() {
        var el = this.el;
        
        el.removeEventListener('rotateFocused', this.eventHandlerFn);
        el.removeEventListener('translateFocused', this.eventHandlerFn);
    },
});

