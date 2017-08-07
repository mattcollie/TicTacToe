(function() {
    function TicTacToe() {
        const ROWS = 3,
              COLS = 3,
              WIDTH = 500,
              HEIGHT = 500,
              CELL_COLOUR = '#FFFF66',
              PLAYER_CHARACTERS = ['X','O'],
              IN_ROW_TO_WIN = 3;
        var _container,
        currentPoint = 0,
        _game = {
            get container() {
                if(!_container)
                    _container = createElement('div', {}, {'background-color':'black',width:WIDTH,height:HEIGHT}, {type:'click', callback: function() {}})
                return _container;
            }
        };

        _game.grid = createGrid();
        _game.state = {
            get turn() {
                return PLAYER_CHARACTERS[(currentPoint++%PLAYER_CHARACTERS.length)];
            }
        };



        attachToBody(_game.container);
        return _game;

        function checkFinish() {

        }

        function validateClick(x, y) {
            if(!_game.grid[x][y].container.textContent) {
                _game.grid[x][y].container.textContent = _game.state.turn;
            }
        }

        function createGrid() {
            let grid = [], table = createElement('table');
            for(let row = 0; row < ROWS; row++) {
                grid[row] = [];
                let tr = createElement('tr');
                for(let col = 0; col < COLS; col++) {
                    grid[row][col] = new Cell(row, col, cellClicked(row, col), {}, {'background-color':CELL_COLOUR,width:WIDTH/ROWS-(WIDTH*.01), height: HEIGHT/COLS-(HEIGHT*.01), left: 'float'});
                    let td = createElement('td');
                    td.appendChild(grid[row][col].container);
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            _game.container.appendChild(table);
            return grid;
        }

        function cellClicked(x, y) {
            return function() {
                if(!checkFinish()) {
                    validateClick(x, y);
                    //alert('cell: ' + x + ', ' + y + ' clicked');
                }
                else {
                    // finished
                }
            }
        }
    }

    function Cell(x, y, callback, attributes = {}, styles = {}) {
        var _cell = {
            x: x,
            y: y,
            container: createElement('div', attributes, styles, {type:'click',callback})
        };
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
        if(event)
            element.addEventListener(event.type, event.callback);
    }

    function attachToBody(container) {
        document.body.appendChild(container);
    }

    if(!window.TicTacToe)
        window.TicTacToe = TicTacToe;
})();