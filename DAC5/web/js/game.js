(function() {
    function TicTacToe() {
        const ROWS = 3,
              COLS = 3,
              PLAYER_CHARACTERS = ['X','O'];
        var _container,
        _game = {
            get container() {
                if(!_container)
                    _container = createElement('div', {}, {'background-color':'black',width:500,height:500}, {type:'click', callback: function() {
                        alert('clicked')
                    }})
                return _container;
            },
            grid: createGrid(),
            state:{}
        };



        attachToBody(_game.container);
        return _game;

        function createGrid() {
            let grid = [];

            for(let row = 0; row < ROWS; row++) {
                grid[row] = [];
                for(let col = 0; col < COLS; col++) {
                    grid[row][col] = new Cell(row, col, cellClicked(row, col));
                    _game.container.appendChild(grid[row][col].container);
                }
            }

            return grid;
        }

        function cellClicked(x, y) {
            return function() {
                alert('cell: ' + x + ', ' + y + ' clicked');
            }
        }
    }

    function Cell(x, y, callback) {
        var _cell = {container: createElement('div', {}, {'background-color':'yellow',width:50, height: 50, left: 'float'}, {type:'click',callback})};

        return _cell;
    }

    function createElement(type, attributes = {}, styles = {}, event) {
        let element = document.createElement(type);
        addAttributes(element, attributes);
        addStyles(element, styles);
        addEvent(element, event)
        return element;
    }

    function addAttributes(element, attributes) {
        for(let attribute in attributes) {
            element.addAttributes(attribute, attributes[attribute]);
        }
    } 

    function addStyles(element, styles) {
        for(var style in styles) {
            if(typeof style === 'object')
                addStyles(element, styles[style]);
            element.style[style] = styles[style];
        }
    }

    function addEvent(element, event) {
        element.addEventListener(event.type, event.callback);
    }

    function attachToBody(container) {
        document.body.appendChild(container);
    }

    if(!window.TicTacToe)
        window.TicTacToe = TicTacToe;
})();