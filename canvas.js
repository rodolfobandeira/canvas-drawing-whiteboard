window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    canvas.height = window.innerHeight - 10;
    canvas.width = window.innerWidth - 10;

    let painting = false;

    function startPosition() {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        context.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        context.lineWidth = 4;
        context.lineCap = "round";
        context.imageSmoothingEnabled = true;

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);

    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});