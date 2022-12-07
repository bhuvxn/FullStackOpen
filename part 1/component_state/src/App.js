import { useState } from "react";
import Display from './components/Display'
import Button from "./components/Button";
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter +1);
  const setToZero = () =>setCounter(0);
  const decreaseByOne = () => setCounter(counter -1);
  return (
    <div>
      <Display counter = {counter}/>
      <Button onClick = {increaseByOne} text = 'plus' />
      <Button onClick = {setToZero} text = 'zero'/>
      <Button onClick = {decreaseByOne} text = 'minus'/>
      
    </div>
  );
};

export default App;
