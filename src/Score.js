import React, { Component } from 'react';
import Confetti from 'react-confetti';

class Score extends React.Component {

    state = {s: 0}

    add = () => {
        this.setState({s : this.state.s+1});
        this.timer();
    }

    timer =() => setTimeout(this.add, 1000); 

    componentDidMount = () => this.timer();

    render(){
      return(
        <span>
          <div className="score_align">Time : 00:{this.state.s}</div>
          <div className="score_align">Score : </div>
          { this.props.shuffledCard.length === this.props.openCardId.length && (<Confetti width={this.props.width} height={this.props.height} />
          )}
        </span>
      )
    }
  }

  export default Score;
