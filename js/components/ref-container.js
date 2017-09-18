const getObjectJson = function(model)
{
    var assetId = model.getAttribute('src');
    var asset = document.querySelector(assetId);

    if (!asset)
        alert("Error: "+assetId+" Id not found!");

    var assetPath = asset.getAttribute('src');
    var jsonPath = assetPath.substring(0, assetPath.lastIndexOf(".")+1)+"json";
    return jsonPath;
}

AFRAME.registerComponent('ref-container', {
    schema: 
    {
        focused: {default: false}
    },
    init: function ()
    {
        var data = this.data;
        var el = this.el;
        var that = this;

        el.addEventListener('triggerFocus', function (event)
            {
                data.focused = !data.focused;
            }
        );
        var jsonPath = getObjectJson(el);
        var points = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': jsonPath,
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })(); 

        $.each(points, function(point, data) {
            that.createRefPoint(data);
        });
    },
    createRefPoint: function(data) {
        var el = this.el;
        var refPoint = document.createElement('a-ref-point');
        refPoint.setAttribute('position', data.position);
        refPoint.setAttribute('focusmodel', 'moveable: false');
        el.appendChild(refPoint);
    }
});

