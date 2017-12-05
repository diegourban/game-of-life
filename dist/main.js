var SetIntervalMixin = {
  componentWillMount: function () {
    this.intervals = [];
  },
  setInterval: function () {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function () {
    this.intervals.map(clearInterval);
  }
};

var Cell = React.createClass({
  displayName: "Cell",

  getInitialState: function () {
    return {
      x: this.props.x,
      y: this.props.y,
      alive: this.props.alive
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      alive: nextProps.alive
    });
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextProps.alive === this.state.alive) {
      return false;
    }
    return true;
  },

  handleClick: function () {
    this.props.onCellClick(this.state.x, this.state.y);
  },

  render: function () {
    var className = "cell";
    if (this.state.alive) {
      className += " alive";
    }
    return React.createElement("td", { className: className, onClick: this.handleClick });
  }
});

var GameOfLife = React.createClass({
  displayName: "GameOfLife",

  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function () {
    return {
      rows: 41,
      cols: 61,
      grid: [],
      generations: 0,
      delay: 100,
      running: true
    };
  },

  componentWillMount: function () {
    var grid = this.createGridOfSize(this.state.rows, this.state.cols);

    var mode = 'GAME';
    //mode = 'TEST';
    if (mode === 'GAME') {
      grid = this.addRandomLivingCells(grid);
    } else if (mode === 'TEST') {
      this.testPatterns(grid);
    }

    this.setState({
      grid: grid
    });
  },

  createGridOfSize: function (rows, cols) {
    var grid = new Array(rows);
    for (var i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    return grid;
  },

  addRandomLivingCells: function (grid) {
    for (var x = 0; x < grid.length; x++) {
      for (var y = 0; y < grid[x].length; y++) {
        var alive = Math.random() < 0.2 ? true : false;
        grid[x][y] = alive;
      }
    }
    return grid;
  },

  clearGrid: function (grid) {
    for (var x = 0; x < grid.length; x++) {
      for (var y = 0; y < grid[x].length; y++) {
        grid[x][y] = false;
      }
    }
  },

  testPatterns: function (grid) {
    for (var x = 0; x < grid.length; x++) {
      for (var y = 0; y < grid[x].length; y++) {
        grid[x][y] = false;
      }
    }
    //this.addStillLifes(grid);
    //this.addOscillators(grid);
    //this.addSpaceships(grid);
  },

  // GENERATING STILL LIFES
  addStillLifes: function (grid) {
    this.addBlockTo(grid);
    this.addBeehiveTo(grid);
    this.addLoafTo(grid);
    this.addBoatTo(grid);
    return grid;
  },

  addBlockTo: function (grid) {
    grid[13][10] = true;
    grid[13][11] = true;
    grid[14][10] = true;
    grid[14][11] = true;
  },

  addBeehiveTo: function (grid) {
    grid[14][15] = true;
    grid[13][16] = true;
    grid[13][17] = true;
    grid[14][18] = true;
    grid[15][16] = true;
    grid[15][17] = true;
  },

  addLoafTo: function (grid) {
    grid[13][23] = true;
    grid[13][24] = true;
    grid[14][22] = true;
    grid[14][25] = true;
    grid[15][23] = true;
    grid[15][25] = true;
    grid[16][24] = true;
  },

  addBoatTo: function (grid) {
    grid[13][29] = true;
    grid[13][30] = true;
    grid[14][29] = true;
    grid[14][31] = true;
    grid[15][30] = true;
  },

  // GENERATING OSCILLATORS
  addOscillators: function (grid) {
    this.addPentadecathlonTo(grid);
    this.addPulsarTo(grid);
    this.addBlinkerTo(grid);
    this.addToadTo(grid);
    this.addBeaconTo(grid);
    return grid;
  },

  addBlinkerTo: function (grid) {
    grid[8][37] = true;
    grid[8][38] = true;
    grid[8][39] = true;
  },

  addToadTo: function (grid) {
    grid[13][38] = true;
    grid[13][39] = true;
    grid[13][40] = true;
    grid[14][37] = true;
    grid[14][38] = true;
    grid[14][39] = true;
  },

  addBeaconTo: function (grid) {
    grid[18][37] = true;
    grid[18][38] = true;
    grid[19][37] = true;
    grid[19][38] = true;

    grid[20][39] = true;
    grid[20][40] = true;
    grid[21][39] = true;
    grid[21][40] = true;
  },

  addPulsarTo: function (grid) {
    grid[8][20] = true;
    grid[8][21] = true;
    grid[8][22] = true;
    grid[8][26] = true;
    grid[8][27] = true;
    grid[8][28] = true;

    grid[10][18] = true;
    grid[10][23] = true;
    grid[10][25] = true;
    grid[10][30] = true;
    grid[11][18] = true;
    grid[11][23] = true;
    grid[11][25] = true;
    grid[11][30] = true;
    grid[12][18] = true;
    grid[12][23] = true;
    grid[12][25] = true;
    grid[12][30] = true;

    grid[13][20] = true;
    grid[13][21] = true;
    grid[13][22] = true;
    grid[13][26] = true;
    grid[13][27] = true;
    grid[13][28] = true;

    grid[15][20] = true;
    grid[15][21] = true;
    grid[15][22] = true;
    grid[15][26] = true;
    grid[15][27] = true;
    grid[15][28] = true;

    grid[16][18] = true;
    grid[16][23] = true;
    grid[16][25] = true;
    grid[16][30] = true;
    grid[17][18] = true;
    grid[17][23] = true;
    grid[17][25] = true;
    grid[17][30] = true;
    grid[18][18] = true;
    grid[18][23] = true;
    grid[18][25] = true;
    grid[18][30] = true;

    grid[20][20] = true;
    grid[20][21] = true;
    grid[20][22] = true;
    grid[20][26] = true;
    grid[20][27] = true;
    grid[20][28] = true;
  },

  addPentadecathlonTo: function (grid) {
    grid[9][8] = true;
    grid[10][7] = true;
    grid[10][8] = true;
    grid[10][9] = true;
    grid[11][6] = true;
    grid[11][7] = true;
    grid[11][8] = true;
    grid[11][9] = true;
    grid[11][10] = true;

    grid[18][6] = true;
    grid[18][7] = true;
    grid[18][8] = true;
    grid[18][9] = true;
    grid[18][10] = true;
    grid[19][7] = true;
    grid[19][8] = true;
    grid[19][9] = true;
    grid[20][8] = true;
  },

  // GENERATING SPACESHIPS
  addSpaceships: function (grid) {
    this.addGliderTo(grid);
    this.addLightweightSpaceshipTo(grid);
    return grid;
  },

  addGliderTo(grid) {
    grid[5][21] = true;
    grid[6][22] = true;
    grid[6][23] = true;
    grid[7][21] = true;
    grid[7][22] = true;
  },

  addLightweightSpaceshipTo(grid) {
    grid[20][6] = true;
    grid[20][9] = true;

    grid[21][10] = true;

    grid[22][6] = true;
    grid[22][10] = true;

    grid[23][7] = true;
    grid[23][8] = true;
    grid[23][9] = true;
    grid[23][10] = true;
  },

  handleStopButtonClick: function () {
    this.setState({
      running: false
    });
  },

  handleStartButtonClick: function () {
    this.setState({
      running: true
    });
  },

  handleClearBoardButtonClick: function () {
    if (!this.state.running) {
      this.setState({
        running: false,
        generations: 0
      });
      this.clearGrid(this.state.grid);
    }
  },

  handleCellClick: function (x, y) {
    if (!this.state.running) {
      console.log("click");
      var newGrid = this.state.grid;
      newGrid[x][y] = !newGrid[x][y];
      this.setState({
        grid: newGrid
      });
    }
  },

  handleAddPattern: function (type) {
    if (!this.state.running) {
      this.clearGrid(this.state.grid);

      if (type === 'STILLLIFES') {
        var newGrid = this.addStillLifes(this.state.grid);
        this.setState({
          grid: newGrid
        });
      } else if (type === 'OSCILLATORS') {
        var newGrid = this.addOscillators(this.state.grid);
        this.setState({
          grid: newGrid
        });
      } else if (type === 'SPACESHIPS') {
        var newGrid = this.addSpaceships(this.state.grid);
        this.setState({
          grid: newGrid
        });
      } else if (type === 'RANDOM') {
        var newGrid = this.addRandomLivingCells(this.state.grid);
        this.setState({
          grid: newGrid
        });
      }
    }
  },

  handleResizeGrid: function (rows, cols) {
    if (!this.state.running) {
      var grid = this.createGridOfSize(rows, cols);
      this.setState({
        rows: rows,
        cols: cols,
        grid: grid,
        generations: 0
      });
    }
  },

  render: function () {
    var tableRows = [];
    for (var x = 3; x < this.state.grid.length - 3; x++) {
      var tableColumns = [];
      for (var y = 3; y < this.state.grid[x].length - 3; y++) {
        var alive = this.state.grid[x][y];
        var key = x + "" + y;
        tableColumns.push(React.createElement(Cell, { key: key, x: x, y: y, alive: alive, onCellClick: this.handleCellClick }));
      }
      tableRows.push(React.createElement(
        "tr",
        { key: "tr" + key },
        tableColumns
      ));
    }

    var table = React.createElement(
      "table",
      { className: "grid" },
      React.createElement(
        "tbody",
        null,
        tableRows
      )
    );

    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-12" },
          React.createElement(
            "h1",
            null,
            "Conways Game of Life"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-xs-12 col-md-9" },
          table
        ),
        React.createElement(
          "div",
          { className: "col-xs-12 col-md-3" },
          React.createElement(
            "div",
            { className: "setup-menu" },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-xs-12" },
                React.createElement(
                  "h3",
                  null,
                  "Running Information"
                ),
                "Generations: ",
                this.state.generations
              )
            ),
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-xs-12" },
                React.createElement(
                  "h3",
                  null,
                  "Controls"
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-3 col-sm-1 col-md-3" },
                  React.createElement(StartButton, { onStartClick: this.handleStartButtonClick })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-3 col-sm-1 col-md-3" },
                  React.createElement(StopButton, { onStopClick: this.handleStopButtonClick })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-3 col-sm-1 col-md-3" },
                  React.createElement(ClearBoardButton, { onClearBoardClick: this.handleClearBoardButtonClick, disabled: this.state.running })
                )
              )
            ),
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-xs-12" },
                React.createElement(
                  "h3",
                  null,
                  "Sizes"
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-12" },
                  React.createElement(ResizeBoardButton, { rows: 36, cols: 56, label: "Small", onClickResizeGridButton: this.handleResizeGrid, disabled: this.state.running })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-12" },
                  React.createElement(ResizeBoardButton, { rows: 41, cols: 61, label: "Medium", onClickResizeGridButton: this.handleResizeGrid, disabled: this.state.running })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-12" },
                  React.createElement(ResizeBoardButton, { rows: 46, cols: 66, label: "Large", onClickResizeGridButton: this.handleResizeGrid, disabled: this.state.running })
                )
              )
            ),
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-xs-12" },
                React.createElement(
                  "h3",
                  null,
                  "Patterns"
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-6" },
                  React.createElement(AddPatternButton, { label: "Still Lifes", type: "STILLLIFES", onAddPatternClick: this.handleAddPattern, disabled: this.state.running })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-6" },
                  React.createElement(AddPatternButton, { label: "Oscillators", type: "OSCILLATORS", onAddPatternClick: this.handleAddPattern, disabled: this.state.running })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-6" },
                  React.createElement(AddPatternButton, { label: "Spaceships", type: "SPACESHIPS", onAddPatternClick: this.handleAddPattern, disabled: this.state.running })
                ),
                React.createElement(
                  "div",
                  { className: "col-xs-12 col-sm-3 col-md-6" },
                  React.createElement(AddPatternButton, { label: "Random", type: "RANDOM", onAddPatternClick: this.handleAddPattern, disabled: this.state.running })
                )
              )
            )
          )
        )
      )
    );
  },

  loop: function () {
    if (this.state.running) {
      var newGrid = this.generate();

      this.setState({
        generations: this.state.generations + 1,
        grid: newGrid
      });
    }
  },

  generate: function () {
    var newGrid = new Array(this.state.rows);
    for (var i = 0; i < this.state.rows; i++) {
      newGrid[i] = new Array(this.state.cols);
    }
    for (var x = 0; x < this.state.grid.length; x++) {
      for (var y = 0; y < this.state.grid[x].length; y++) {
        var totalOfLivingNeighbours = this.getTotalOfLivingNeighborsFrom(x, y);

        newGrid[x][y] = this.state.grid[x][y];

        if (this.state.grid[x][y]) {
          if (totalOfLivingNeighbours < 2 || totalOfLivingNeighbours > 3) {
            // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
            // Any live cell with more than three live neighbours dies, as if by over-population.
            newGrid[x][y] = false;
          } else {
            // Any live cell with two or three live neighbours lives on to the next generation.
          }
        } else {
          // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          if (totalOfLivingNeighbours === 3) {
            newGrid[x][y] = true;
          }
        }
      }
    }

    return newGrid;
  },

  getTotalOfLivingNeighborsFrom: function (x, y) {
    if (this.isCellAtCorner(x, y)) {
      return this.countTotalOfLivingNeighboursFromCorners(x, y);
    } else {
      if (this.isCellAtFirstOrLastRow(x)) {
        // load neighbours from first or last row
        return this.countTotalOfLivingNeighboursFromFirstOrLastRow(x, y);
      } else {
        if (this.isCellAtFirstOrLastCol(y)) {
          // load neighbours from first or last cols
          return this.countTotalOfLivingNeighboursFromFirstOrLastCol(x, y);
        } else {
          // is in the middle so has all 8 neighbours
          return this.countTotalOfLivingNeighboursFromAllSides(x, y);
        }
      }
    }

    return 0;
  },

  isCellAtCorner: function (x, y) {
    // is upper left or upper right corner
    if (x === 0 && (y === 0 || y === this.state.cols - 1)) {
      return true;
    }

    // is lower left or right corner
    if (x === this.state.rows - 1 && (y === 0 || y === this.state.cols - 1)) {
      return true;
    }

    return false;
  },

  countTotalOfLivingNeighboursFromCorners: function (x, y) {
    var totalOfLivingNeighbours = 0;

    if (x === 0) {
      if (y === 0) {
        // upper left corner
        if (this.state.grid[x][y + 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x + 1][y + 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x + 1][y] === true) {
          totalOfLivingNeighbours++;
        };
        return totalOfLivingNeighbours;
      }

      if (y === this.state.cols - 1) {
        // upper right corner
        if (this.state.grid[x][y - 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x + 1][y - 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x + 1][y] === true) {
          totalOfLivingNeighbours++;
        };
        return totalOfLivingNeighbours;
      }
    }

    if (x === this.state.rows - 1) {
      if (y === 0) {
        // lower left corner
        if (this.state.grid[x][y + 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x - 1][y + 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x - 1][y] === true) {
          totalOfLivingNeighbours++;
        };
        return totalOfLivingNeighbours;
      }

      if (y === this.state.cols - 1) {
        // lower right corner
        if (this.state.grid[x][y - 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x - 1][y - 1] === true) {
          totalOfLivingNeighbours++;
        };
        if (this.state.grid[x - 1][y] === true) {
          totalOfLivingNeighbours++;
        };
        return totalOfLivingNeighbours;
      }
    }

    return totalOfLivingNeighbours;
  },

  isCellAtFirstOrLastRow: function (x) {
    return x === 0 || x === this.state.rows - 1;
  },

  countTotalOfLivingNeighboursFromFirstOrLastRow: function (x, y) {
    var totalOfLivingNeighbours = 0;

    if (x === 0) {
      // first row without corners
      if (this.state.grid[x][y - 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      return totalOfLivingNeighbours;
    }

    if (x === this.state.rows - 1) {
      // last row without corners
      if (this.state.grid[x][y - 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x - 1][y - 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x - 1][y] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x - 1][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      return totalOfLivingNeighbours;
    }
    return totalOfLivingNeighbours;
  },

  isCellAtFirstOrLastCol: function (y) {
    return y === 0 || y === this.state.cols - 1;
  },

  countTotalOfLivingNeighboursFromFirstOrLastCol: function (x, y) {
    var totalOfLivingNeighbours = 0;

    if (y === 0) {
      // first col without corners
      if (this.state.grid[x - 1][y] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x - 1][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y + 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y] === true) {
        totalOfLivingNeighbours++;
      };
      return totalOfLivingNeighbours;
    }

    if (y === this.state.cols - 1) {
      // last col without corners
      if (this.state.grid[x - 1][y] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x - 1][y - 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x][y - 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y - 1] === true) {
        totalOfLivingNeighbours++;
      };
      if (this.state.grid[x + 1][y] === true) {
        totalOfLivingNeighbours++;
      };
      return totalOfLivingNeighbours;
    }
    return totalOfLivingNeighbours;
  },

  countTotalOfLivingNeighboursFromAllSides: function (x, y) {
    var totalOfLivingNeighbours = 0;
    if (this.state.grid[x - 1][y] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x - 1][y + 1] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x][y + 1] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x + 1][y + 1] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x + 1][y] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x + 1][y - 1] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x][y - 1] === true) {
      totalOfLivingNeighbours++;
    };
    if (this.state.grid[x - 1][y - 1] === true) {
      totalOfLivingNeighbours++;
    };
    return totalOfLivingNeighbours;
  },

  componentDidMount: function () {
    this.setInterval(this.loop, this.state.delay);
  }
});

var StartButton = React.createClass({
  displayName: "StartButton",

  handleClick: function () {
    this.props.onStartClick();
  },
  render: function () {
    return React.createElement(
      "button",
      { type: "button", id: "startButton", className: "btn btn-primary", onClick: this.handleClick },
      "Start"
    );
  }
});

var StopButton = React.createClass({
  displayName: "StopButton",

  handleClick: function () {
    this.props.onStopClick();
  },
  render: function () {
    return React.createElement(
      "button",
      { type: "button", id: "stopButton", className: "btn btn-danger", onClick: this.handleClick },
      "Stop"
    );
  }
});

var ClearBoardButton = React.createClass({
  displayName: "ClearBoardButton",

  handleClick: function () {
    this.props.onClearBoardClick();
  },
  render: function () {
    var disabled = this.props.disabled === true ? 'disabled' : '';

    return React.createElement(
      "button",
      { type: "button", id: "clearBoardButton", className: "btn btn-warning " + disabled, onClick: this.handleClick, disabled: disabled ? "disabled" : "" },
      "Clear"
    );
  }
});

var ResizeBoardButton = React.createClass({
  displayName: "ResizeBoardButton",

  handleClick: function () {
    this.props.onClickResizeGridButton(this.props.rows, this.props.cols);
  },
  render: function () {
    var disabled = this.props.disabled === true ? 'disabled' : '';

    return React.createElement(
      "button",
      { type: "button", id: "{this.props.label}SizeGridButton", className: "btn btn-default " + disabled, disabled: disabled ? "disabled" : "", onClick: this.handleClick },
      this.props.label,
      " (",
      this.props.rows - 6,
      " X ",
      this.props.cols - 6,
      ")"
    );
  }
});

var AddPatternButton = React.createClass({
  displayName: "AddPatternButton",

  handleClick: function () {
    this.props.onAddPatternClick(this.props.type);
  },
  render: function () {
    var disabled = this.props.disabled === true ? 'disabled' : '';

    return React.createElement(
      "button",
      { type: "button", id: "addPatternButton", className: "btn btn-default " + disabled, disabled: disabled ? "disabled" : "", onClick: this.handleClick },
      this.props.label
    );
  }
});

ReactDOM.render(React.createElement(GameOfLife, null), document.getElementById("game-of-life"));