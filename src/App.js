import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { PLACEHOLDERS, ITEMS } from "./custom/data";
import { shuffle, getTimeLeft, move, GAME_STATE } from "./custom/utils";

import Modal from "./components/Modal";
import Dropzone from "./components/Dropzone";

const GAME_DURATION = 1000 * 300; // 3 secondszz

const initialState = {
  // shuffling data
  bench: shuffle(ITEMS),
  [PLACEHOLDERS.one]: [],
  [PLACEHOLDERS.two]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

class App extends React.Component {
  state = initialState;

  startGame = () => {
    this.currentDeadline = Date.now() + GAME_DURATION;

    this.setState(
      {
        gameState: GAME_STATE.PLAYING,
        timeLeft: getTimeLeft(this.currentDeadline),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.timer = setInterval(() => {
      const timeLeft = getTimeLeft(this.currentDeadline);
      const isTimeout = timeLeft <= 0;
      if (isTimeout && this.timer) {
        clearInterval(this.timer);
      }

      this.setState({
        timeLeft: isTimeout ? 0 : timeLeft,
        ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
      });
    }, 1000);
  };

  endGame = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.setState({
      gameState: GAME_STATE.DONE,
    });
  };

  resetGame = () => {
    this.setState(initialState);
  };

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    console.log("Sent");
    this.setState((state) => {
      console.log(destination);
      return move(state, source, destination);
    });
  };

  render() {
    const { gameState, timeLeft, bench, ...groups } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <>
        {this.state.gameState !== GAME_STATE.PLAYING && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
            timeLeft={timeLeft}
            gameState={gameState}
            groups={groups}
          />
        )}
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
              <Dropzone
                id={PLACEHOLDERS.one}
                items={this.state[PLACEHOLDERS.one]}
                isDropDisabled={isDropDisabled}
              />
              <Dropzone
                id={PLACEHOLDERS.two}
                items={this.state[PLACEHOLDERS.two]}
                isDropDisabled={isDropDisabled}
              />
              <Dropzone
                id="bench"
                items={bench}
                isDropDisabled={isDropDisabled}
              />
            </div>
          </DragDropContext>
        )}
      </>
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default App;
