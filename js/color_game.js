// Wait for the entire content of the web page to load before running the script.
document.addEventListener('DOMContentLoaded', function() {
    // References to the canvas and its drawing context, and the UI controls.
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const undoButton = document.getElementById('undoButton');
    const redoButton = document.getElementById('redoButton');

    // State variables to manage painting, paths drawn, and undo/redo functionality.
    let painting = false;
    let paths = []; // Stores the paths drawn
    let redoStack = []; // Stores paths removed by undo for redo purpose
    let currentPath = []; // Stores the current path being drawn

    // Function to load and draw the SVG as the canvas background.
    selected_pic = "manger_3.jpg"
    function loadAndDrawSVG(selected_pic) {
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            redrawAll(false);  // Redraw all paths without clearing the canvas
        };
        // console.log(selected_pic)
        img.src = 'images/'+selected_pic; // Path to the SVG file
    }

    // Starts a new drawing path when the mouse is pressed on the canvas.
    function startPosition(e) {
        painting = true;
        currentPath = [];  // Reset current path
        draw(e);
    }

    // Ends the drawing path when the mouse is released.
    function finishedPosition() {
        painting = false;
        ctx.beginPath();
        if (currentPath.length > 0) {
            paths.push(currentPath);
            console.log('Path added', paths);
            redoStack = []; // Clear the redo stack whenever a new path is added
        }
    }

    // Draws on the canvas as the mouse moves, if painting is true.
    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        currentPath.push({ x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop, color: ctx.strokeStyle, width: ctx.lineWidth });
    }

    // Undoes the last path drawn.
    function undoLast() {
        if (paths.length > 0) {
            redoStack.push(paths.pop());
            console.log('Undo:', paths);
            redrawAll(true);
        }
    }

    // Redoes the last undone path.
    function redoLast() {
        if (redoStack.length > 0) {
            paths.push(redoStack.pop());
            console.log('Redo:', paths);
            redrawAll(true);
        }
    }

    // Redraws all paths on the canvas.
    function redrawAll(clearCanvas) {
        if (clearCanvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            loadAndDrawSVG(selected_pic);  // Ensure SVG is redrawn first
        } else {
            paths.forEach(path => {
                ctx.beginPath();
                ctx.strokeStyle = path[0].color;
                ctx.lineWidth = path[0].width;
                ctx.moveTo(path[0].x, path[0].y);
                path.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                });
                ctx.beginPath();
            });
        }
    }

    // Event listeners for mouse interactions with the canvas.
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    undoButton.addEventListener('click', undoLast);
    redoButton.addEventListener('click', redoLast);

    loadAndDrawSVG(selected_pic); // Load SVG as background when the page is ready

    // download the result png
    function downloadCanvas() {
        const link = document.createElement('a');
        link.download = 'canvas_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
    const pics = ["angel_1.jpg","bethlehem_2.jpg","manger_3.jpg","shepherds_4.jpg","worship_5.jpg","temple_6.jpg"]
    // Function to find next element in an array
    function findNextElement(array, element) {
        const index = array.indexOf(element);
        if (index === -1) {
            return null; // Element not found
        }
        return array[(index + 1) % array.length]; // Wrap around using modulo operator
    }
    // Function to change the background pic for canvas
    function changePic(){
        selected_pic = findNextElement(pics,selected_pic)
        // empty all the records
        paths = []
        redoStack = []
        currentPath = []
        // reload the canvas
        loadAndDrawSVG(selected_pic)
    }

    document.getElementById('downloadButton').addEventListener('click', downloadCanvas);
    document.getElementById('changeButton').addEventListener('click', changePic);

});
