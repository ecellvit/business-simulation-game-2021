import React from "react";
import { Route, Switch } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop.jsx";
import Login from "./components/Login/Login";
import NavigationBar from "./components/NavigationBar";
import MainPage from "./components/Mainpage/MainPage.jsx";

function App() {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/Round1">
          <DndProvider backend={HTML5Backend}>
            <div>
              <DragDrop />
            </div>
          </DndProvider>
        </Route>
        <Route path="/Mainpage" exact>
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// const GAME_DURATION = 1000 * 300; // 300 seconds
// const initialState = {
//   // shuffling data
//   bench: shuffle(Supermarket),
//   [Placeholders]: [],
//   gameState: GAME_STATE.READY,
//   timeLeft: 0,
// };

// class App extends React.Component {
//   state = initialState;

//   startGame = () => {
//     this.currentDeadline = Date.now() + GAME_DURATION;

//     this.setState(
//       {
//         gameState: GAME_STATE.PLAYING,
//         timeLeft: getTimeLeft(this.currentDeadline),
//       },
//       this.gameLoop
//     );
//   };

//   gameLoop = () => {
//     this.timer = setInterval(() => {
//       const timeLeft = getTimeLeft(this.currentDeadline);
//       const isTimeout = timeLeft <= 0;
//       if (isTimeout && this.timer) {
//         clearInterval(this.timer);
//       }

//       this.setState({
//         timeLeft: isTimeout ? 0 : timeLeft,
//         ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
//       });
//     }, 1000);
//   };

//   endGame = () => {
//     if (this.timer) {
//       clearInterval(this.timer);
//     }

//     this.setState({
//       gameState: GAME_STATE.DONE,
//     });
//   };

//   resetGame = () => {
//     this.setState(initialState);
//   };

//   onDragEnd = ({ source, destination }) => {
//     if (!destination) {
//       return;
//     }

//     this.setState((state) => {
//       console.log(destination);
//       return move(state, source, destination);
//     });
//   };

//   render() {
//     const { gameState, timeLeft, bench, ...groups } = this.state;
//     const isDropDisabled = gameState === GAME_STATE.DONE;

//     return (
//       <>
//         {this.state.gameState !== GAME_STATE.PLAYING && (
//           <Modal
//             startGame={this.startGame}
//             resetGame={this.resetGame}
//             timeLeft={timeLeft}
//             gameState={gameState}
//             groups={groups}
//           />
//         )}
//         {(this.state.gameState === GAME_STATE.PLAYING ||
//           this.state.gameState === GAME_STATE.DONE) && (
//           <DragDropContext onDragEnd={this.onDragEnd}>
//             <div className="container">
//              <Dropzone
//                 id={Supermarket}
//                 items={this.state[Placeholders]}
//                 isDropDisabled={isDropDisabled}
//               />
//               <Dropzone
//                 id={Supermarket}
//                 items={this.state[Placeholders]}
//                 isDropDisabled={isDropDisabled}
//               />

//               <Dropzone
//                 id="bench"
//                 items={bench}
//                 isDropDisabled={isDropDisabled}
//               />
//             </div>
//           </DragDropContext>
//         )}
//       </>
//     );
//   }

//   componentWillUnmount() {
//     if (this.timer) {
//       clearInterval(this.timer);
//     }
//   }
// }

// const GAME_DURATION = 1000 * 300; // 300 seconds
// const initialState = {
//   // shuffling data
//   bench: shuffle(Supermarket),
//   [Placeholders]: [],
//   gameState: GAME_STATE.READY,
//   timeLeft: 0,
// };

// class App extends React.Component {
//   state = initialState;

//   startGame = () => {
//     this.currentDeadline = Date.now() + GAME_DURATION;

//     this.setState(
//       {
//         gameState: GAME_STATE.PLAYING,
//         timeLeft: getTimeLeft(this.currentDeadline),
//       },
//       this.gameLoop
//     );
//   };

//   gameLoop = () => {
//     this.timer = setInterval(() => {
//       const timeLeft = getTimeLeft(this.currentDeadline);
//       const isTimeout = timeLeft <= 0;
//       if (isTimeout && this.timer) {
//         clearInterval(this.timer);
//       }

//       this.setState({
//         timeLeft: isTimeout ? 0 : timeLeft,
//         ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
//       });
//     }, 1000);
//   };

//   endGame = () => {
//     if (this.timer) {
//       clearInterval(this.timer);
//     }

//     this.setState({
//       gameState: GAME_STATE.DONE,
//     });
//   };

//   resetGame = () => {
//     this.setState(initialState);
//   };

//   onDragEnd = ({ source, destination }) => {
//     if (!destination) {
//       return;
//     }

//     this.setState((state) => {
//       console.log(destination);
//       return move(state, source, destination);
//     });
//   };

//   render() {
//     const { gameState, timeLeft, bench, ...groups } = this.state;
//     const isDropDisabled = gameState === GAME_STATE.DONE;

//     return (
//       <>
//         {this.state.gameState !== GAME_STATE.PLAYING && (
//           <Modal
//             startGame={this.startGame}
//             resetGame={this.resetGame}
//             timeLeft={timeLeft}
//             gameState={gameState}
//             groups={groups}
//           />
//         )}
//         {(this.state.gameState === GAME_STATE.PLAYING ||
//           this.state.gameState === GAME_STATE.DONE) && (
//           <DragDropContext onDragEnd={this.onDragEnd}>
//             <div className="container">
//               <Dropzone
//                 id={Supermarket}
//                 items={this.state[Placeholders]}
//                 isDropDisabled={isDropDisabled}
//               />
//               <Dropzone
//                 id={Supermarket}
//                 items={this.state[Placeholders]}
//                 isDropDisabled={isDropDisabled}
//               />
//               <Dropzone
//                 id="bench"
//                 items={bench}
//                 isDropDisabled={isDropDisabled}
//               />
//             </div>
//           </DragDropContext>
//         )}
//       </>
//     );
//   }

//   componentWillUnmount() {
//     if (this.timer) {
//       clearInterval(this.timer);
//     }
//   }
// }

// export default App;
