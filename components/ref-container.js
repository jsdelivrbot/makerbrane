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

        el.addEventListener('triggerFocus', function (event)
            {
                data.focused = !data.focused;
            }
        );
        (function()
            {
                var jsonPath = getObjectJson(el);
                $.getJSON(jsonPath, {
                    format: "json"
                })
                    .done(function(points)
                        {
                            $.each(points, function(point, data) {
                                createRefPoint(el, data);
                            });
                        });
            })();

    }
});

const createRefPoint = function (elParent, data)
{
    var refPoint = document.createElement('a-ref-point');
    refPoint.setAttribute('position', data.position);
    elParent.appendChild(refPoint);
}

