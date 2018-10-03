import React, { Component } from 'react';
import './App.css';
import Universe from './logic/Universe';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universe: new Universe(),
      size: [90, 20],
      gameRunning: false,
      interval: 100
    }
  }

  handleRowChange = (event) => {
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

  handleColumnChange = (event) => {
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

  changeInterval = (event) => {
    this.setState({
      interval: event.target.value
    })
  }

  startGame = () => {
    if(!this.state.gameRunning){
      this.setState({
        gameRunning: true,
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), this.state.interval);
      })
    }
  }

  stopGame = () => {
    this.setState({
      gameRunning: false
    }, () => {
      if(this.intervalRef) {
        clearInterval(this.intervalRef);
      }
    })
  }

  runGame = () => {
    this.setState({
      universe: this.state.universe.addGeneration()
    })
  }

  storeCell = (position) => {
    if(!this.state.gameRunning) {
      this.setState({
        universe: this.state.universe.storeCell(position)
      })
    }
  }

  renderBoard = () => {
    var newWorld = [];
    var cellRow = [];

    for(var i = 0; i < this.state.size[0]; i++) {
      for (var j = 0; j < this.state.size[1]; j++){
        if(this.state.universe.isCellAlive(i + " , " + j)){
          cellRow.push(
            <Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
          );
        } else {
          cellRow.push(
            <Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
          );
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
          <div className="headerInnerContainer">
            <label className="label">
              Rows:
              <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />
            </label>
            <label className="label">
              Columns:
              <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />
            </label>
            <label className="label">
              Interval:
              <input className="input" type="text" value={this.state.interval} onChange={this.changeInterval} />
            </label>
          </div>
          <div className="headerButtons">
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

class Cell extends Component {
  render() {
    return (
      <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "cellContainerLive" : "cellContainerDead"}></div>
    );
  }
}
