import React, { Component } from 'react';
import './World.css';
import Cell from '../../components/Cell/Cell';

export default class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualWorld: [],
      nextWorld: [],
      generation: 0,
      size: [20, 20],
      board: [],
      gameRunning: false
    }

    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.drawBoard = this.drawBoard.bind(this);
  }

  componentDidMount() {
    this.drawBoard();
  }

  storeCell(position) {

    let current = this.state.actualWorld;

      for(var i = 0; i < current.length; i++) {
        if(current[i] === position) {
          current.splice(i, 1);

          this.setState({
            actualWorld: current
          })
          return
        }
      }

    current.push(position);

    this.setState({
      actualWorld: current
    })
  }

  drawBoard() {
    let board = [];
    let row = [];

    for(var i = 0; i < this.state.size[1]; i++) {
      for(var j = 0; j < this.state.size[0]; j++){
        row.push(<Cell key={[i, j]} position={[i, j]} storeCell={this.storeCell.bind(this)}/>);
      }

      board.push(<div className="row" key={i}>{row}</div>);
      row = [];
    }

    this.setState({
      board: board,
    })
  }

  handleRowChange(event) {
    if(!this.state.gameRunning) {
      var actualSize = this.state.size;

      if(event.target.value < 20)
        actualSize[0] = event.target.value;
      else
        actualSize[0] = 20

      this.setState({
        size: actualSize,
      });

      this.drawBoard();
    }
  }

  handleColumnChange(event) {
    if(!this.state.gameRunning) {
      var actualSize = this.state.size;
      if(event.target.value < 90)
        actualSize[1] = event.target.value;
      else
        actualSize[1] = 90

      this.setState({
        size: actualSize,
      });

      this.drawBoard();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      gameRunning: true
    })
  }

  render() {
    return (
      <div className="worldContainer">
        <div className="headerContainer">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="formInnerContainer">
              <label className="label">
                Rows:
                <input className="input" type="text" value={this.state.size[0]} onChange={this.handleRowChange} />
              </label>
              <label className="label">
                Columns:
                <input className="input" type="text" value={this.state.size[1]} onChange={this.handleColumnChange} />
              </label>
            </div>
            <input className="submit" type="submit" value="Submit" />
          </form>
          Generation: {this.state.generation}
        </div>
        <div className="boardContainer">
          {this.state.board}
        </div>
      </div>
    );
  }
}
