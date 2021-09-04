import './App.css';
import {useState} from 'react';

const Counter = ({contador})=>{
  return <h2>{contador}</h2>
}
function App(props) {
  const [contador,setContador] = useState(0);
  const handleClick=(value)=>{
   // setContador(prev=> prev+value)
    setContador(prev=> {
      return prev+1
    })
  }
  return (
    <>
      <button onClick={()=>handleClick(1)}>Incrementar</button>
      <button onClick={()=>handleClick(contador*-1)}>Reiniciar</button>
      <button onClick={()=>handleClick(-1)}>Decrementar</button>
      <Counter contador={contador}/>
      <p>{contador%2===0 ? "Es par ": "Impar"}</p>
    </>
  )
}

export default App;
/////////////////////// NOTAS
// cuando usando el setState :
/***
 * const [state,setState] = useState(0)
 * para actualizar el state se puede hacer de dos formas: 
 * setState(state+1)  ----> actualiza el estado directamente 
 * setState(prev=> prev+1)   ----------> actualiza el estado con el estado previo
 * setState(prev =>{         ----------> lo mismo, pero:  
 *    return prev+1         -----------> cuando se usa llaves debe incluir el return explicito , cuando es una sola linea NOO
 * })
 * 
 * IMPORTANTE: Un componente se renderiza cuando le llegan nuevas props y cada vez que cambia el estado interno
 * 
 * 
 */