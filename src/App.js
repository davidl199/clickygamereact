import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Title from "./components/Title";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    guess: "Click on an image to begin!",
    friends: friends
  };

  updateScore = () => {
    this.setState((newScore) => ({
      score: newScore.score + 1,
      guess: "You guessed Correctly!"
    }), () => this.checkIfWinner())
  }

  updateHighScore = () => {
    this.setState((newHighScore) => ({
      highScore: newHighScore.score,
    }))
  }

  checkIfWinner = () => {
    if (this.state.score === this.state.friends.length) {
      this.setState({guess: "Congratulations you Won!!"});
      this.resetGameState();
    }
    else {
      setTimeout(() => {
        this.reOrderImages(this.state.friends)
      }, 500);
    }
  }

  resetGameState = () => {
    this.state.friends.forEach((image) => {
      image.cliked = false;
    })
    this.setState({ score: 0 })
  }

  reOrderImages = (array) => {
    let counter = array.length, temp, index;

    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;

        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    this.setState({ friends: array });
  }

  processSelectedImage = id => {
    this.state.friends.forEach((image) => {
      if (image.id === id) {
        if (image.cliked) {
          this.setState({ guess: "You guessed Incorrectly!"})
          this.resetGameState();
          return false;
        }
        else {
          image.cliked = true;
          this.updateScore();  
        }
        if (this.state.score >= this.state.highScore) {
          this.updateHighScore();
        }
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Title guess={this.state.guess} score={this.state.score} highScore={this.state.highScore} />
        {this.state.friends.map(friend => (
          <FriendCard
            id={friend.id}
            key={friend.id}
            image={friend.image}
            processSelectedImage={this.processSelectedImage}
            reOrderImages={() => this.reOrderImages(this.state.friends)}
          />
        ))}
      </Wrapper>
    )
  };
}

export default App;