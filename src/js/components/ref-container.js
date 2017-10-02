// Gets the path for the json file that contains the points of the model
// ex: /models/modelX.obj
// searchs for /models/modelX.json
// if not found alerts the user
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

// Component used to for ref-containers where it will go and look
// for a json file and assign some ref points according to it
AFRAME.registerComponent('ref-container', {
    init: function ()
    {
        var el = this.el;
        var that = this;

        (function()
            {
                var jsonPath = getObjectJson(el);
                $.getJSON(jsonPath, {
                    format: "json"
                })
                    .done(function(points)
                        {
                            $.each(points, function(point, data) {
                                that.createRefPoint(data);
                            });

                            el.emit("ref-points-loaded");
                        });
            })();
    },
    createRefPoint: function(data) {
        var el = this.el;
        var refPoint = document.createElement('a-ref-point');
        refPoint.setAttribute('position', data.position);
        // ref points can be focused but not moved
        refPoint.setAttribute('focusmodel', 'moveable: false');
        refPoint.setAttribute('static-body', '');
        refPoint.addEventListener('collide', function(e) {
            console.log(e);
        });
        el.appendChild(refPoint);
    }
});
