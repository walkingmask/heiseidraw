var board = new DrawingBoard.Board('drawing-board', {
    controls: [
        'Color',
        { Size: { type: 'dropdown' } },
        'Navigation',
    ],
    background: '#e7e7e7',
    size: 10,
    enlargeYourContainer: true,
    droppable: true,
    stretchImg: true,
});

(function () {
    // target aspect ratio
    const targetWidth = 40;
    const targetHeight = 55;

    // elements
    const wrapper = $('#drawing-container-inner');
    const drawingBoard = $('#drawing-board');
    const controls = $('.drawing-board-controls');

    // stretch canvas
    const boardWidth = drawingBoard.width();
    const boardHeight = drawingBoard.height() * 0.8;
    let newBoardWidht, newBoardHeight;
    if (boardHeight >= boardWidth) {
        if (boardWidth * (targetHeight / targetWidth) <= boardHeight) {
            newBoardWidht = boardWidth;
            newBoardHeight = boardWidth * (targetHeight / targetWidth);
        }
        else {
            newBoardWidht = boardHeight * (targetWidth / targetHeight);
            newBoardHeight = boardHeight;
        }
    }
    else {
        if (boardHeight * (targetWidth / targetHeight) <= boardWidth) {
            newBoardWidht = boardHeight * (targetWidth / targetHeight);
            newBoardHeight = boardHeight;
        }
        else {
            newBoardHeight = boardWidth * (targetHeight / targetWidth);
            newBoardWidht = boardWidth;
        }
    }
    drawingBoard.width(newBoardWidht).height(newBoardHeight);
    drawingBoard.css({"left": (wrapper.width() - drawingBoard.width()) / 2});
    $('.drawing-board-canvas-wrapper').width(newBoardWidht).height(newBoardHeight);
    $('.drawing-board-canvas').width(newBoardWidht).height(newBoardHeight);
    let ctx = $('.drawing-board-canvas')[0].getContext('2d');
    ctx.canvas.width = newBoardWidht;
    ctx.canvas.height = newBoardHeight;
    board.reset({webStorage: false, history: false, background: true});

    // stretch controls
    controls.width(newBoardWidht);
    const unit = controls.width() / 8;
    const unitSmall = controls.width() / 15;
    // color picker
    $('.drawing-board-control-colors').width(unit*1.2).height(unit);
    $('.drawing-board-control-colors .drawing-board-control-inner').width(unit).height(unit);
    $('.drawing-board-control-colors-rainbows').width(unitSmall*15).height(unitSmall*3 + 8);
    $('.drawing-board-control-colors-rainbow').width(unitSmall*15).height(unitSmall);
    $('.drawing-board-control-colors-current').width(unit).height(unit);
    $('.drawing-board-control-colors-picker').width(unitSmall).height(unitSmall);
    // size dropdown
    $('.drawing-board-control-size').width(unit*1.5).height(unit);
    $('.drawing-board-control-size .drawing-board-control-inner').width(unit*1.5).height(unit);
    $('.drawing-board-control-size-dropdown-current').width("100%").height("100%");
    $('.drawing-board-control-size-dropdown').width(unit*2);
    $('.drawing-board-control-size-dropdown li').height(unit).css({"min-height": unit});
    $('.drawing-board-control-size-dropdown li span').css({});
    // nav
    $('.drawing-board-control-navigation').width(unit*3.5).height(unit);
    $('.drawing-board-control-navigation-back').width(unit).height(unit).css("fontSize", "3vh");
    $('.drawing-board-control-navigation-forward').width(unit).height(unit).css("fontSize", "3vh");
    $('.drawing-board-control-navigation-reset').width(unit).height(unit).css("fontSize", "3vh");

    // add help link
    controls.append('<div id="help-link" class="drawing-board-control"><span>?</span></div>');
    $('#help-link').width(unit).height(unit).click(function () {
        window.location.href = '/help';
    });
})();
