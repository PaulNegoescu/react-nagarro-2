import { useReducer } from "react";
import clsx from "clsx";

//css modules
import styles from './Counter.module.css';

interface Action {
  type: 'update' | 'reset';
  payload: number;
}

export function Counter({initialCount = 0, diff = 1}) {
  const [count, dispatch] = useReducer(countReducer, initialCount);
  const cls = clsx({
    [styles.positive]: count > 0, 
    [styles.negative]: count < 0
  });

  return (
    <>
      <output className={cls}>{ count }</output>
      <div>
        <button onClick={() => dispatch({type: 'update', payload: -diff})}>- {diff}</button>
        <button onClick={() => dispatch({type: 'update', payload: -1})}>-</button>
        <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</button>
        <button onClick={() => dispatch({type: 'update', payload: 1})}>+</button>
        <button onClick={() => dispatch({type: 'update', payload: diff})}>+ {diff}</button>
      </div>
    </>
  );
}

function countReducer(oldCount: number, action: Action) {
  let newCount = oldCount;
  switch(action.type) {
    case 'update': 
      newCount = oldCount + action.payload;
      break;
    case 'reset': 
      newCount = action.payload;
      break;
  }

  return newCount;
}

// let state;
// function myUseState(initialState) {
//   if(!state) {
//     state = initialState;
//   }

//   function updateState(newState) {
//     if(newState === state) return;
//     state = newState;
//     Counter();
//   }

//   return [state, updateState];
// }
