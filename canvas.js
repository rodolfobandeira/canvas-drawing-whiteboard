function renderPoints(context, points) {
    context.lineWidth = 3;
    context.strokeStyle = '#FF0000';
    context.lineCap = "round";
    context.imageSmoothingEnabled = true;

    let xx = points[0][0][0] + 40;
    let yy = points[0][0][1] + 40;

    console.log(xx + ", " + yy);
    context.moveTo(xx, yy);
    context.beginPath();

    points.forEach(point => {
        xx = point[0][0];
        yy = point[0][1];
        context.lineTo(xx, yy);
    });

    context.stroke();
}


window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    canvas.height = window.innerHeight - 10;
    canvas.width = window.innerWidth - 10;

    // localStorage.setItem("points", []);
    pp = JSON.parse(localStorage.getItem("points"))
    console.log(pp);
    renderPoints(context, pp);

    let painting = false;
    let points = [];

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        context.beginPath();
        // console.log(points);
        // renderPoints(points);
    }

    function getXY(e) {
      let r = canvas.getBoundingClientRect();
      return {x: e.clientX - r.left, y: e.clientY - r.top}
    }

    function draw(e) {
        let pos = getXY(e);

        if (!painting) return;
        context.lineWidth = 4;
        context.lineCap = "round";
        context.imageSmoothingEnabled = true;

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);

        points.push([]);
        points[points.length - 1].push([pos.x, pos.y]);
    
        localStorage.setItem("points", JSON.stringify(points));
    }

      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", finishedPosition);
      canvas.addEventListener("mousemove", draw);
  });

