import React, {Component} from 'react';

function Square(props){
        if (props.disabled) {
            return (
                <button className="square square_disabled">
                  {props.value}
                </button>
            );
        }
        return (
          <button className="square" onClick = {props.onClick}>
            {props.value}
          </button>
        );
    
}
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        winner: null,
      };
    }
    
    handleCLick(i){
        const squares = this.state.squares.slice();
        
        if(squares[i] !== null){
            return;
        }
        squares[i] =  this.state.xIsNext ? 'X' : 'O' ;
        this.setState({ 
            squares: squares,
            xIsNext: !this.state.xIsNext,
            
            });
            const winner = calculateWinner(squares);
            if(winner){
                this.setState( {
                    winner: winner
                });
        }
    }
    renderSquare(i) {
        const disabled = (this.state.squares[i] || this.state.winner);

      return <Square disabled={disabled} value= {this.state.squares[i]} onClick = {() => {this.handleCLick(i)}}/>;
    }
  
    render() { 
      const squares = this.state.squares.slice();
        
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner;
        }else if (!(squares.indexOf(null) > -1)) {
          status = 'Drawn - Game Over!' ;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for(var i=0;i<lines.length;i++){
          const [a,b,c]= lines[i];
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
              return squares[a];
          }
      }
      return null;
}


  
class App extends Component {
    render() {
        return (
                <Game />
              
        );
    }
}

export default App;
