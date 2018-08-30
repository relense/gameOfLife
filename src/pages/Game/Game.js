import React, { Component } from 'react';
import './Game.css';
import Cell from '../../components/Cell/Cell';
import Universe from '../../logic/Universe';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universe: new Universe(),
      size: [90, 20],
      gameRunning: false,
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

  handleRowChange(event) {
    if(!this.state.gameRunning) {
      var actualSize = this.state.size;

      if(event.target.value < 20)
        actualSize[1] = event.target.value;
      else
        actualSize[1] = 20;

      this.setState({
        size: actualSize,
      });

      this.renderBoard();
    }
  }

  handleColumnChange(event) {
    if(!this.state.gameRunning) {
      var actualSize = this.state.size;
      if(event.target.value < 90)
        actualSize[0] = event.target.value;
      else
        actualSize[0] = 90;

      this.setState({
        size: actualSize,
      });

      this.renderBoard();
    }
  }

  startGame() {
    if(!this.state.gameRunning){
      this.setState({
        gameRunning: true,
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), 10);
      })
    }
  }

  stopGame(){
    this.setState({
      gameRunning: false
    }, () => {
      if(this.intervalRef) {
        clearInterval(this.intervalRef);
      }
    })
  }

  runGame() {
    this.setState({
      universe: this.state.universe.addGeneration()
    })
  }

  storeCell(position) {
    if(!this.state.gameRunning) {
      this.setState({
        universe: this.state.universe.storeCell(position)
      })
    }
  }

  renderBoard() {
    var newWorld = [];
    var cellRow = [];

    for(var i = 0; i < this.state.size[0]; i++) {
      for (var j = 0; j < this.state.size[1]; j++){
        if(this.state.universe.isCellAlive(i + " , " + j)){
          cellRow.push(<Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>);
        } else {
          cellRow.push(<Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>);
        }
      }
      newWorld.push(<div className="row" key={i}>{cellRow}</div>);
      cellRow = [];
    }

    return newWorld;
  }

  render() {
    return (
      <div className="worldContainer">
        <div className="headerContainer">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="formInnerContainer">
              <label className="label">
                Rows:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
              </label>
              <label className="label">
                Columns:
                <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
              </label>
            </div>
          </form>
          <div className="formButtons">
            <button className="submit" onClick={this.startGame}>Start</button>
            <button className="submit" onClick={this.stopGame}>Stop</button>
          </div>
          Generation: {this.state.universe.getGeneration()}
        </div>
        <div className="boardContainer">
        {this.renderBoard()}
        </div>
      </div>
    );
  }
}
