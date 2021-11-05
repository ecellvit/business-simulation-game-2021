import React from "react";

import { GAME_STATE, getTotalScore } from "../custom/utils";

const Modal = ({ gameState, groups, startGame, timeLeft, resetGame }) => (
  <div className="modal modal-sm active">
    <div className="modal-overlay" />
    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title h4">Supermarket Game</div>
      </div>
      <div className="modal-body">
        <div className="content h6">
          {" "}
          {gameState === GAME_STATE.READY
            ? `Drag and Drop items in the correct Placeholder`
            : `You scored - ${getTotalScore(groups, timeLeft)}`}
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={gameState === GAME_STATE.READY ? startGame : resetGame}
        >
          {gameState === GAME_STATE.READY ? "Start new game" : "Restart game"}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
