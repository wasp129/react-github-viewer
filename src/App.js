import React from 'react';
import axios from 'axios';

const Card = (props) => {
    return (
      <div className="outerDiv">
          <img src={props.avatar_url} alt="" />
          <div className="innerDiv"> 
            <div className="name">{props.name}</div>
            <div className="company">{props.company}</div>
          </div>
      </div>
    );
};

const CardList = (props) => {
  return(
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
      console.log('Event: Form Submit', this.state.userName);
      axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(res => {
          this.props.onSubmit(res.data);
        });
  };
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.userName} onChange={(event) => this.setState({ userName: event.target.value })} placeholder="Github username:" required />
        <button type="submit">Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [
        {
          name: "Paul O'Shannessy",
          avatar_url: "https://avatars1.githubusercontent.com/u/8445?v=4",
          company: "Facebook"
        },

        {
          name: "Ben Alpert",
          avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
          company: "Facebook"
        },
      ]
    };
  }

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }))
  };

  render() {
    return(
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    )
  }
}

export default App;
