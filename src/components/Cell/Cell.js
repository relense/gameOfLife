import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
  constructor(props) {
    super(props)
    this.state =  {
      live: false,
      position: this.props.position
    }

    this.changeCellState = this.changeCellState.bind(this);
  }

  changeCellState(){
    this.setState({
      live: !this.state.live
    })

    this.props.storeCell(this.state.position)
  }

  render() {
    return (
      <div onClick={() => this.changeCellState()}>
        <div className={this.state.live ? "cellContainerLive" : "cellContainerDead"}>
        </div>
      </div>
    );
  }
}
