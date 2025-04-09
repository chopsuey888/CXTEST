var viewer = new Marzipano.Viewer(document.getElementById('pano'));

var scenes = {};
var sceneDataArray = sceneData.scenes;

sceneDataArray.forEach(function(data) {
  var source = Marzipano.ImageUrlSource.fromString("tiles/" + data.id + "/1/{f}/{y}/{x}.jpg");

  var geometry = new Marzipano.CubeGeometry([
    { tileSize: 512, size: 1024 }
  ]);

  var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180);
  var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

  var scene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });

  scenes[data.id] = scene;
});

var startScene = window.location.hash.substring(1) || "L";
if (scenes[startScene]) {
  scenes[startScene].switchTo();
} else {
  console.warn("找不到場景 ID：" + startScene);
}
