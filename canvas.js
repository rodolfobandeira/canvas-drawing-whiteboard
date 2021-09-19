window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    canvas.height = window.innerHeight - 10;
    canvas.width = window.innerWidth - 10;

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
        renderPoints(points);
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

        points = [];
        points[points.length - 1].push([pos.x, pos.y]);
        // console.log(pos);
    }

    function renderPoints(points) {

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#FF0000';
        context.beginPath();

        /// get a stroke
        for(let i = 0; i < points.length; i++) {
            console.log(points[i][0], points[i][1]);

            context.lineTo(points[i][0], points[i][1]);
            context.stroke();
            context.beginPath();
            context.moveTo(points[i][0], points[i][1]);
        }
    }

      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", finishedPosition);
      canvas.addEventListener("mousemove", draw);
  });

