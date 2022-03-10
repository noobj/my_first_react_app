import { Component } from 'react';

type SquareProps = {
  value: string;
  highlight: boolean;
  onClick: () => void;
};

type BodardProps = {
  squares: string[];
  winner?: number[] | null;
  onClick: (i: number) => void;
};

function Square(props: SquareProps) {
  const enableHighlight = props.highlight ? 'highlighted' : '';
  return (
    <button className={`square ${enableHighlight}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component<BodardProps> {
  renderSquare(i: number) {
    const highlight =
      this.props.winner !== null ? (this.props.winner?.includes(i) ? true : false) : false;
    return (
      <Square
        value={this.props.squares[i]}
        highlight={highlight}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const arr = [0, 3, 6];
    const elements = arr.map((v) => {
      return (
        <div key={v} className="board-row">
          {[v, v + 1, v + 2].map((value) => this.renderSquare(value))}
        </div>
      );
    });
    return <div>{elements}</div>;
  }
}

type GameState = {
  history: {
    squares: string[];
  }[];
  stepNumber: number;
  xIsNext: boolean;
  sortDesc: boolean;
};

class Game extends Component {
  state: GameState = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true,
    sortDesc: false
  };

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  handleSort = () => {
    this.setState({
      sortDesc: !this.state.sortDesc
    });
  };

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });

    this.setState({
      history: this.state.history.slice(0, step + 1)
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const desc = this.state.sortDesc;

    const historyForMove = !desc ? history : history.reverse();
    const moves = historyForMove.map((step, move) => {
      move = !desc ? move : historyForMove.length - move - 1;
      const describe = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          {move === this.state.stepNumber ? (
            <button onClick={() => this.jumpTo(move)} className="font-bold">
              {describe}
            </button>
          ) : (
            <button onClick={() => this.jumpTo(move)}>{describe}</button>
          )}
        </li>
      );
    });

    let status: string;

    if (moves.length === 10) status = 'Draw ya motherfucker';
    else if (winner) {
      status = 'Winner: ' + current.squares[winner[0]];
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} winner={winner} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>
            {status} <button onClick={this.handleSort}>Sort</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

// declare global {
//   interface Array<T> {
//     reverseMap<U>(
//       callbackfn: (value: T, index: number, array: readonly T[]) => U,
//       thisArg?: any
//     ): U[];
//   }
// }

// Array.prototype.reverseMap = function (callback) {
//   const arr = [];
//   for (let i = this.length - 1; i >= 0; i--) arr.push(callback(this[i], i, this));
//   return arr;
// };

export default Game;
