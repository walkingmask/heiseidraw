(function () {
    const board = document.getElementById('board');
    const container = board.parentElement;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const base = Math.min(width, height);
    if (base === width) {
        board.style.width = width+"px";
        board.style.height = width * (55/40)+"px";
    }
    else {
        board.style.width = height * (40/55)+"px";
        board.style.height = height+"px";
    }
})();

var board = new DrawingBoard.Board('board', {
    background: '#e7e7e7',
    size: 10,
    enlargeYourContainer: true,
});

(function () {
    const width = $('.drawing-board-canvas').width(); 
    const base = width / 10;
    const base2 = width / 15;

    $('#container').width(width);
    $('#controller-container').width(width);
    $('#board-container').width(width).height($('.drawing-board-canvas').height());
    $('#run-container').width(width);

    $('#board').height($('#board-container').height());

    $('.drawing-board-controls').appendTo('#controller-container').removeAttr('data-align');
    $('.drawing-board-controls').height($('#controller-container').height());

    $('.drawing-board-control-colors .drawing-board-control-inner').width(base).height(base);
    $('.drawing-board-control-colors-current').width(base).height(base);
    $('.drawing-board-control-colors-picker').width(base2).height(base2);
    $('.drawing-board-control-colors-rainbows').width(base2*14).height(base2*3.5);
    $('.drawing-board-control-colors-rainbow').width(base2*14).height(base2);

    $('.drawing-board-control-drawingmode-pencil-button').width(base).height(base).css("background-size","3vh");
    $('.drawing-board-control-drawingmode-eraser-button').width(base).height(base).css("background-size","3vh");
    $('.drawing-board-control-drawingmode-filler-button').width(base).height(base).css("background-size","3vh");

    $('.drawing-board-control-size').width(base*1.5).height(base);
    $('.drawing-board-control-size .drawing-board-control-inner').width(base*1.5).height(base);
    $('.drawing-board-control-size-dropdown-current').width("100%").height("100%");
    $('.drawing-board-control-size-dropdown').width(base*2);
    $('.drawing-board-control-size-dropdown li').css({"min-height": base});
    // $('.drawing-board-control-size-dropdown li span').css({});

    $('.drawing-board-control-navigation-back').width(base).height(base).css("fontSize","4vh");
    $('.drawing-board-control-navigation-forward').width(base).height(base).css("fontSize","4vh");
    $('.drawing-board-control-navigation-reset').width(base).height(base).css("fontSize","4vh");

    $('#run-container').width($('.drawing-board-canvas').width()).css({'text-align': 'center'})
})();