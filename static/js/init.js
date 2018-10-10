(function () {
    const container = $('#board-container');
    const width = container.width();
    const height = container.height();
    const base = (width * (55/40) > height)? height : base;
    const board = $('#board');

    if (!window.matchMedia || window.matchMedia('(max-width:480px)').matches) {
        // Flexible width on Smart phone (0px <= width <= 480px)
        if (base === width) {
            board.width(width);
            board.height(width * (55/40));
        }
        else {
            board.width(height * (40/55));
            board.height(height);
        }
    }
    else {
        // Fixed width on Tablet, PC (480px < width)
        // (for drag-n-drop image feature, flexible width makes it harder to
        // adjust image width & height)
        board.width(480);
        board.height(640);
    }
})();

var board = new DrawingBoard.Board('board', {
    controls: [
        'Color',
        { Size: { type: 'dropdown' } },
        'Navigation',
    ],
    background: '#e7e7e7',
    size: 10,
    enlargeYourContainer: true,
    droppable: true,
});

(function () {
    const width = $('.drawing-board-canvas-wrapper').width() + 2; 

    $('#container').width(width);
    $('#container').height('auto');
    $('#controller-container').width(width);
    $('#board-container').width(width).height($('.drawing-board-canvas-wrapper').height() + 2);
    $('#run-container').width(width);

    $('#board').height($('#board-container').height());

    $('.drawing-board-controls').appendTo('#controller-container').removeAttr('data-align');

    const base = width / 8;
    const base2 = width / 15;

    $('.drawing-board-control-colors .drawing-board-control-inner').width(base).height(base);
    $('.drawing-board-control-colors-current').width(base).height(base);
    $('.drawing-board-control-colors-picker').width(base2).height(base2);
    $('.drawing-board-control-colors-rainbows').width(base2*14).height(base2*3.5);
    $('.drawing-board-control-colors-rainbow').width(base2*14).height(base2);

    $('.drawing-board-control-size').width(base*1.5).height(base);
    $('.drawing-board-control-size .drawing-board-control-inner').width(base*1.5).height(base);
    $('.drawing-board-control-size-dropdown-current').width("100%").height("100%");
    $('.drawing-board-control-size-dropdown').width(base*2);
    $('.drawing-board-control-size-dropdown li').css({"min-height": base});
    // $('.drawing-board-control-size-dropdown li span').css({});

    // $('.drawing-board-control-navigation').width(base*3.5).height(base);
    $('.drawing-board-control-navigation-back').width(base).height(base).css("fontSize","3vh");
    $('.drawing-board-control-navigation-forward').width(base).height(base).css("fontSize","3vh");
    $('.drawing-board-control-navigation-reset').width(base).height(base).css("fontSize","3vh");
})();
