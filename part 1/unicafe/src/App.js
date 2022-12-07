import "./App.css";
import { useState } from "react";
import React from "react";
import Statistics from "./Components/Statistics";
import Button from "./Components/Button";
const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [Positive, setPositive] = useState(0);
  const HandleGoodClick = () => {
    setTotal(total + 1);
    setAverage((total + 1) / total);
    setGood(good + 1);
    setPositive(good / total);
  };
  const HandleBadClick = () => {
    setTotal(total - 1);
    setPositive(good / total);
    setAverage(average / total);
    setBad(bad + 1);
  };

  const HandleNeutralClick = () => {
    setAverage(total / total);
    setTotal(total + 1);
    setNeutral(neutral + 1);
    setPositive(good / total);
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick = {HandleGoodClick} text = 'good'/>
        <Button handleClick = {HandleNeutralClick} text = 'neutral'/>
        <Button handleClick = {HandleBadClick} text = 'bad'/>
      </div>
      <h2>Statistics</h2>
      {total === 0 && <div>No feedback yet</div>}
      {total > 0 && (
        <div>
          <Statistics text="good" value={good} />
          <Statistics text="neutral" value={neutral} />
          <Statistics text="bad" value={bad} />
          <Statistics text="average" value={average} />
          <Statistics text="Positive" value={Positive} />
        </div>
      )}
    </div>
  );
};

export default App;
