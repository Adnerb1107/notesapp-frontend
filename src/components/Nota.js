export const Nota = ({content, date, important}) =>{
    return (
        <li>
            <p>{content}</p>
            <p>{date}</p>
            <p>{important ? "Nota importante": "No interesa"}</p>
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