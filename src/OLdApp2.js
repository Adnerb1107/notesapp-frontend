import { useState } from "react";
// CREAR UN ESTADO INICIAL 
// FUERA DEL COMPONENTE PARA QUE ESTE NO SE RENDERICE "N" VECES
const INITIAL_STATE= {
    izquierda:8,
    derecha:20
}
const App = () =>{
    // con dos estados valor: izquierda, derecha y clicks    
    const [clicks,setClicks] = useState([])
    const [valor, setValor] = useState(INITIAL_STATE)
    const handleLeft = ()=>{
        setValor({
            ...valor,
            izquierda: valor.izquierda+1
        })
        setClicks((prev)=>[...prev,"L"])
    }
    const handleRight = ()=>{
        setValor({
            ...valor,
            derecha:valor.derecha+1
        })
        setClicks((prev)=>[...prev,"R"])

    }
    const handleReset = () =>{
        setValor(INITIAL_STATE)
        setClicks([])
    }
    // cons dos estados: left y rigth
    const [left , setLeft] = useState(0)
    const [rigth , setRigth] = useState(0)

    // con un estado : para saber numero de clicks, veces clickeadas en derecha e izquierda
    const [clicked,setClicked] = useState([]);
    const e_left= clicked.filter(e_left => e_left === "L")
    const e_rigth= clicked.filter(e_rigth => e_rigth === "R")
    const handleE_Left = ()=>{
        setClicked(prev => [...prev, "L"])
    }
    const handleE_Right = ()=>{
        setClicked(prev => [...prev, "R"])
    }

    return (
        <>
            <p>{left}</p>
                <button onClick={()=>setLeft(left+1)}>Derecha</button>
                <button onClick={()=>setRigth(rigth+1)}>Izquierda</button>
            <p>{rigth}</p>
            <hr/>
            <p>{valor.izquierda}</p>
                <button onClick={handleLeft}>Izquierda</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleRight}>Derecha</button>
            <p>{valor.derecha}</p>
            {clicks.length>0? 
                <>
                    <p>Total de clicks {clicks.length}:</p>
                    {clicks.join(', ')}
                </>
                : <p>No ha clickeado nada</p>
            }
            <hr />
            <p>Con un solo estado :</p>
            <p>
                {e_left.length}
                <button onClick={handleE_Left}>Izquierda</button>                
                <button onClick={handleE_Right}>Derecha</button>
                {e_rigth.length}
                <p>
                    {clicked.join(', ')}
                </p>


            </p>
        </>
    )
}
export default App;

/**
 * 
 * El estado siempre debe ser inmutable
 * 
 */