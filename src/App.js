//App.js

import "./styles.css";
import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  /* creates a new state variable called dice using the useState hook in React. 
  The useState hook is a function that takes a single argument, which is the initial value for the state variable. 
  In this case, the initial value is set to the result of calling the allNewDice function. 
  setDice is a function that can be used to update the value of dice.*/
  const [dice, setDice] = React.useState(allNewDice());

  /*This creates a new state variable called tenzies with an initial value of false. 
setTenzies is a function that can be used to update the value of tenzies. */
  const [tenzies, setTenzies] = React.useState(false);

  /*The useEffect hook is then used to run some logic whenever the value of dice changes. 
 This hook is a function that takes a callback function and an array of dependencies as arguments. 
 In this case, the callback function checks if every die in the dice array is held and if all of the dice have the same value. 
 If this is the case, it updates the tenzies state variable by calling setTenzies(true). 
 The array of dependencies is [dice], which means that the callback function will be called any time the value of dice changes.
*/

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);
  // This function generates a new die object with a random value and unique id
  // Generate a random integer between 1 and 6 (inclusive)
  // The die is not held initially
  // Generate a unique id for the die using the nanoid function
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }
  // This function generates an array of 10 new die objects
  // Create an empty array to store the new dice
  // Generate 10 new dice and add them to the array
  // Generate a new die and add it to the array of dice
  // Return the array of dice
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // This function rolls the dice, replacing any non-held dice with new dice
  function rollDice() {
    // Check if the game is in tenzies mode
    if (!tenzies) {
      // In normal mode, only roll the non-held dice
      setDice((oldDice) =>
        oldDice.map((die) => {
          // If the die is not held, generate a new die and return it
          // Otherwise, return the old die
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      // In tenzies mode, reset the game and generate 10 new dice
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  // This function toggles the isHeld property of a die with the given id
  function holdDice(id) {
    // Map the old dice to new dice, toggling the isHeld property of the die with the given id
    setDice((oldDice) =>
      // For each die, if the die has the given id, return a new die object with the isHeld property toggled
      // Otherwise, return the old die
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // This function takes an array of dice and creates a Die component for each one
  const diceElements = dice.map((die) => (
    // Each Die component gets a unique key based on the die's id property
    // The value and isHeld props are also set based on the current die
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      // The holdDice prop is set to a callback that holds the die with the given id
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
