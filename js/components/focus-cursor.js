// Sends the entities that's being clicked to the system
// to get subscribed
AFRAME.registerComponent('focus-cursor', {
    init: function () {
        this.el.addEventListener('mousedown', function (event) {
            var sys = document.querySelector('a-scene').systems['focus-system'];
            var el = event.detail.intersectedEl;
            if (!keysPressed[17])
                sys.unfocusAll();
            if (!el)
                return;
            sys.focus(el);
        });
    },
    remove: function () {
    }
});

