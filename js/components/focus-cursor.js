// Sends the entities that's being clicked to the system
// to get subscribed
AFRAME.registerComponent('focus-cursor', {
    init: function () {
        this.el.addEventListener('mousedown', function (event) {
            var sys = document.querySelector('a-scene').systems['focus-system'];
            var el = event.detail.intersectedEl;

            console.log(event.detail);
            // If CTRL is pressed you can focus more models
            if (!keys.keysPressed[17])
                sys.unfocusAll();
            if (!el)
                return;

            sys.focus(el);
        });
    },
});

