export const Nota = ({id,content, important, toogleImportance}) =>{
    
    return (
        <li>            
            {content}
            <button onClick={toogleImportance}>{important ? 'Make not important ': 'Make important'}</button>
        </li>
    )
}
// se recomiendan usar default values
// {cateries=[],content,date,important}
// modulo nombrado y por defecto 
// Nombrado
// export const Nombre = () =>{}
// import {Nombre} from '../"
// Por defecto
// export default Nombre;
// import Pepito from "./.."