import React, { Component } from 'react';
import './App.css';
const _ = require('lodash');
const card = require('./data');


class App extends Component {

  
  
  onUnload = e => {
    e.preventDefault();
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    window.onbeforeunload = function(event) { 
      alert("HELLO WORLD");
    };

  }
  
  // componentWillUnmount() {
  //    window.removeEventListener("beforeunload", this.onUnload)
  // }

  state = {
    displayCard: [],
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

  render() {

    
    let  {cardMatchNumber, openCardId, shuffledCard} = this.state;
    return (
      
      <div className="box">
      
      {shuffledCard.map((card => {
        return(<>
          <div key={card.cardID} className={cardMatchNumber.includes(card.cardID)  ? ' pointerEvents': 'boxC'} className={openCardId.includes(card.cardID) ? 'boxB':'boxC'} onClick={()=> this.onCardClick(card)} >
          {openCardId.includes(card.cardID) ? <img className="imageDisplay" src={card.image} alt="" /> : <a className="">'?'</a>}
          </div>
          
        </>
        );
      }))}
      </div>
    );
  }
}

export default App;
