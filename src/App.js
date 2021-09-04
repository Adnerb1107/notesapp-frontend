import {Nota} from './components/Nota';
import {useState} from 'react';

const App = (props) =>{
    const [notas, setNotas] = useState(props.notes);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);


    const handleSubmit = (e)=>{
      e.preventDefault();

      console.log("crear nota")
      const noteToUpload = {
        id:notas.length+1,
        content: newNote,
        date:new Date().toISOString(),
        important: Math.random()<0.5
      }      
      setNotas(prevNotas => [...prevNotas,noteToUpload])
      setNewNote('')
    }
    const handleChange = (e)=>{
      setNewNote(e.target.value)
    }
      
    const handleChangeStatusNotes = ()=>{    
      setShowAll(!showAll)
    }
    if(typeof notas === "undefined" || notas.length ===0){
        return "NO tenemos notas que mostrar"
    }    
    return (
      <>
        <h1>Notas app</h1>
        <button onClick={handleChangeStatusNotes}>{showAll?'ver importantes ':"ver todas"}</button>
        <ul>
            {
                // el map transforma el valor : retorna algo
                // podemos usar lo siguiente, pero no controlamos lo que pasamos
                // <Nota {...nota} key={nota.id}/>
                // lo mejor es especificar las props que se desean pasar
                notas
                  .filter(nota=>{
                    if(showAll) return true
                    return nota.important === true
                  })
                  .map(nota =>
                     <Nota content={nota.content} date={nota.date} important={nota.important} key={nota.id}/> 
                  )
            }
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" value={newNote} onChange={handleChange} />
          <button >Agregar nota</button>
        </form>
      </>
    )
}
export default App;

///  comentarios
// en el formulario no se necesita el evento onClick 
// el form tiene evento onSubmit 
// se tiene que colocar el e.preventDefault()
// EL ULTIMO BOTON POR DEFECTO FUNCIONA COMO SUBMIT
// es decir: 
// <button type="submit">Subir</button>
// PERO SE PUEDE CAMBIAR ESE COMPORTAMIENTO
// <button type="button">Crear </button>
