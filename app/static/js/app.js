var nImages = 39;
var imagePath = _imagePath + '/';
var imagePrefix = 'i';
var imageExt = '.png';
var images = [];
var imageWidth = 300;
var imageHeight = 200;
var frameWidth = 81;
var frameHeight = 116;
var quality = 0;
var delay = 75;
var imagePreLoaded = false;
var progress = 0;

function updateProgress () {
    progress += 1;
    const displayValue = progress / (nImages*3) * 100;
    $('#progress').val(displayValue);
    $('#progress').text(displayValue + '%');
}

function loadImage (src) {
    const image = new Image();
    image.src = src;
    return new Promise(resolve => {
        image.onload = () => resolve(image);
    });
}

async function preLoadImages () {
    for (let i = 0; i < nImages; i++) {
        const path = imagePath+imagePrefix+('000'+i).slice(-3)+imageExt;
        const image = await loadImage(path);
        images.push(image);
        updateProgress();
    }
    imagePreLoaded = true;
}
preLoadImages();

function waitPreLoad () {
    return new Promise(resolve => {
        let loop = setInterval(() => {
            if (imagePreLoaded === true) {
                clearInterval(loop);
                resolve();
            }
        }, 100);
    });
}

function resizeCanvas (canvas, width, height) {
    return new Promise(async resolve => {
        const drawing = await loadImage(canvas.toDataURL());
        let newCanvas = document.createElement('canvas');
        newCanvas.width = width;
        newCanvas.height = height;
        let newContext = newCanvas.getContext('2d');
        newContext.drawImage(drawing, 0, 0, drawing.width, drawing.height, 0, 0, width, height);
        resolve(newCanvas);
    });
}

function makeColorRect (image, color) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(0, 0, image.width, image.height);
    return canvas;
}

async function generate (drawing, callback) {
    let canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    let context = canvas.getContext('2d');

    const points = _points;
    let p1 = new Perspective(context, makeColorRect(drawing, '#e7e7e7'));
    let p2 = new Perspective(context, drawing);

    let gifGenerator = new GIF({
        repeat: 0,
        quality: quality,
        workers: 2,
        workerScript: _workerScript,
        width: imageWidth,
        height: imageHeight,
    });

    await waitPreLoad();

    for (let i = 0; i < nImages; i++) {
        p1.draw(points[i]);
        p2.draw(points[i]);
        context.drawImage(images[i], 0, 0);
        gifGenerator.addFrame(context, {copy: true, delay: delay});
        updateProgress();
    }

    gifGenerator.on('progress', function() {
        updateProgress();
    });
    gifGenerator.on('finished', function(blob) {
        callback(blob);
    });
    gifGenerator.render();
}

async function run () {
    $('#drawing-container').addClass('hide');
    $('#progress-container').removeClass('hide');

    let canvas = $('canvas')[0];
    canvas = await resizeCanvas(canvas, frameWidth, frameHeight);
    const drawing = await loadImage(canvas.toDataURL());

    generate(drawing, (imageBlob) => {
        $('#result-image').attr({'src': URL.createObjectURL(imageBlob)});
        $('#progress-container').addClass('hide');
        $('#result-container').removeClass('hide');
    });
}

$('#run').click(run);
