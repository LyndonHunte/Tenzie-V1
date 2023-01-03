//Die.js
import React from "react";
/*
This is a functional component for rendering a die face
It receives the following props:
- isHeld: boolean indicating whether the die is currently held or not
- value: the value of the die
- holdDice: a function to be called when the die is clicked
*/

export default function Die(props) {
  // Create a styles object to apply the appropriate background color
  // based on the isHeld prop
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  return (
    // Render a div with the die-face class and the styles we created
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
