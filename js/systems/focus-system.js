/**
 * The subject that the models are going to subscribe to
 * Focused objects subscribe to it.
 * It can rotate or translate every subscribed elem
 */
AFRAME.registerSystem('focus-system', {
    init: function () {
        this.models = [];
    },
    focus: function (el) {
        // If it's already focused or doesn't have the focusmodel component
        // do nothing
        if (this.isFocused(el) ||
            !el.hasAttribute('focusmodel')
        )
            return;
        el.setAttribute('material', 'opacity: 1');
        this.models.push(el);
    },
    unfocus: function (el) {
        el.setAttribute('material', 'opacity: 0.5');
        var index = this.models.indexOf(el);
        this.models.splice(index, 1);
    },
    unfocusAll: function () {
        var length = this.models.length;
        for(let i = 0; i < length; ++i) {
            this.unfocus(this.models[0]);
        }
    },
    isFocused: function(el) {
        return (this.models.indexOf(el) !== -1);
    },
    // Translate all subscribers
    translate: function(vec3) {
        this.models.forEach(function(model) {
            if (model.components.focusmodel.data.moveable)
                model.emit('translateFocused', {vec3 : vec3});
        });
    },
    // Rotate all subscribers
    rotate: function(vec3) {
        this.models.forEach(function(model) {
            if (model.components.focusmodel.data.moveable)
                model.emit('rotateFocused', {vec3 : vec3});
        });
    }
});

