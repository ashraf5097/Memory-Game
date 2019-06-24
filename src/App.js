import React, { Component } from 'react';
import './App.css';
import { setTimeout } from 'timers';
import Score from './Score';

const _ = require('lodash');
const card = require('./data');
// import useWindowSize from 'react-use/lib/useWindowSize'

class App extends Component {

  state = {
    displayCard: [],
    s: 0,
    cardMatchNumber:[],
    openCardId: [],
    pointerEvents:false,
   shuffledCard : _.shuffle(card).slice(0,12)
  }


 

  onCardClick = (card) => {
    let {displayCard,cardMatchNumber, openCardId} = this.state;

    displayCard.push(card.number);
    openCardId.push(card.cardID);

    this.setState({displayCard});

    if(displayCard.length > 1) {
      if (displayCard[0] === displayCard[1]) {
          this.setState({
            cardMatchNumber: [...openCardId],
            displayCard:[]
          });
      } else{
        setTimeout(() => {
          this.setState({
            openCardId:[...cardMatchNumber],
            displayCard: []
            
          });
        }, 350);
      }
    }
  }

endTime (){
  let endTime = new Date();
  return endTime;
}

  render() {
    console.log("state = ", this.state.s);
    let  {cardMatchNumber, openCardId, shuffledCard} = this.state;
    // const { width, height } = useWindowSize()
    const width = window.innerWidth;
    const height = window.innerHeight;
    let startTime = new Date();
    let calculatedEndTime = 0;
    
    console.log("shuffledCard = ", shuffledCard.length);
    console.log("openCardId = ", openCardId.length);
    let output = 0;
    let timeElapsed = 0;
  
    return (
      <div>
      
         <Score width={width} height={height} shuffledCard={shuffledCard} openCardId={openCardId} s={this.state.s}/>

         <span className="box">
            {shuffledCard.map((card => {
              return(<>
                <div key={card.cardID} className={cardMatchNumber.includes(card.cardID)  ? ' pointerEvents': 'boxC'} className={openCardId.includes(card.cardID) ? 'boxB':'boxC'} onClick={()=> this.onCardClick(card)} >
                {openCardId.includes(card.cardID) ? <img className="imageDisplay" src={card.image} alt="" /> : <a className="">'?'</a>}
                </div>
              </>
              );
            }))}
          </span>
      </div>
    );
  }
}


export default App;
