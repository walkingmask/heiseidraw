function loadImage (src) {
    const image = new Image();
    image.src = src;
    return new Promise(resolve => {
        image.onload = () => resolve(image);
    });
}

function resizeCanvas (canvas, width, height) {
    return new Promise(async resolve => {
        const drawing = await loadImage(canvas.toDataURL());
        let newCanvas = document.createElement("canvas");
        newCanvas.width = width;
        newCanvas.height = height;
        let newContext = newCanvas.getContext('2d');
        newContext.drawImage(drawing, 0, 0, drawing.width, drawing.height, 0, 0, width, height);
        resolve(newCanvas);
    });
}

async function generate (drawing, callback) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;

    const points = [
        [[1,1],[1,1],[1,1],[1,1]], // 1
        [[1,1],[1,1],[1,1],[1,1]],
        [[11,176],[74,127],[85,137],[25,181]],
        [[5,160],[77,111],[96,143],[24,182]],
        [[0,138],[75,103],[99,144],[27,182]], // 5
        [[0,117],[76,89],[104,155],[27,183]],
        [[1,105],[81,79],[105,156],[26,181]],
        [[3,88],[83,67],[108,163],[26,185]],
        [[5,81],[86,63],[109,167],[27,185]],
        [[6,75],[92,61],[108,171],[23,183]], // 10
        [[12,68],[98,61],[108,177],[25,183]],
        [[16,63],[104,61],[107,179],[24,183]],
        [[19,61],[104,62],[108,181],[24,183]],
        [[22,63],[107,64],[109,185],[23,183]],
        [[22,65],[108,65],[111,185],[24,185]], // 15
        [[22,68],[111,68],[112,186],[25,190]],
        [[22,70],[111,70],[112,188],[27,192]],
        [[23,75],[112,73],[115,190],[28,193]],
        [[24,73],[113,73],[116,192],[29,195]],
        [[27,76],[113,74],[117,193],[31,196]], // 20
        [[29,77],[115,75],[117,194],[33,197]],
        [[31,79],[116,78],[120,195],[35,198]],
        [[32,80],[119,79],[122,196],[39,198]],
        [[37,80],[123,80],[123,197],[41,199]],
        [[40,82],[125,82],[125,198],[42,199]], // 25
        [[43,82],[128,82],[129,199],[42,199]],
        [[43,82],[129,82],[130,200],[43,199]],
        [[44,81],[132,82],[133,199],[45,199]],
        [[45,81],[134,82],[133,200],[46,199]],
        [[47,81],[136,82],[135,200],[48,199]], // 30
        [[48,81],[137,82],[136,200],[49,199]],
        [[49,81],[138,82],[137,200],[50,199]],
        [[49,81],[138,82],[137,200],[50,199]],
        [[50,81],[139,82],[138,200],[51,199]],
        [[50,81],[139,82],[138,200],[51,199]], // 35
        [[50,81],[139,82],[138,200],[51,199]],
        [[50,81],[139,82],[138,200],[51,199]],
        [[50,81],[139,82],[138,200],[51,199]],
        [[50,81],[139,82],[138,200],[51,199]], // 39
    ];
    let p = new Perspective(context, drawing);

    let encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(83);
    encoder.start();

    for (let i = 0; i < 39; i++) {
        // draw resized drawing
        p.draw(points[i]);
        // overlay trimed image
        const image = await loadImage('static/images/mov'+('000'+i).slice(-3)+'.png');
        context.drawImage(image, 0, 0);
        console.log(encoder.addFrame(context));

        let progress = document.getElementById('progress');
        if (progress) progress.innerText = '生成中... \n'+i+'/'+38;
    }

    encoder.finish();

    const image = await loadImage('data:image/gif;base64,'+encode64(encoder.stream().getData()));
    callback(image, encoder);
}

async function run () {
    let container = document.getElementById('container');
    let canvas = document.getElementsByTagName('canvas')[0];

    // resize
    canvas = await resizeCanvas(canvas, 81, 116);
    const drawing = await loadImage(canvas.toDataURL());

    generate(drawing, (image, encoder) => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        image.style.width = "100%";
        image.style.marginTop = "50%";
        image.style.marginBottom = "10%";

        let reload = document.createElement('button');
        reload.innerText = "もう一度";
        reload.id = "reload";
        reload.addEventListener('click', () => {
            location.reload();
        });

        container.appendChild(image);
        container.appendChild(reload);
    });

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let image = await loadImage('static/images/loading.svg');
    image.style.width = "30%";
    image.style.marginTop = "50%";
    image.style.marginBottom = "10%";

    let progress = document.createElement("p");
    progress.innerText = '生成中...';
    progress.style.fontSize = '4vh';
    progress.id = 'progress';

    container.appendChild(image);
    container.appendChild(progress);
}

document.getElementById('run').addEventListener('click', run);
