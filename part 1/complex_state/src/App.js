import "./App.css";
import { useState } from "react";
import History from "./components/History";
import Button from './components/Button'
const App = () => {

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])


  const handleLeftClick = ()=> {
    setAll(allClicks.concat('L'))
    setLeft(left +1)
  }
  const handleRightClick = ()=>{
    setAll(allClicks.concat('R'))
    setRight(right +1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text = 'left'/>
      <Button handleClick={handleRightClick}text = 'right' />
      {right}
      <History allClicks={allClicks}/>
    </div>
  );
};

export default App;
