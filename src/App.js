import {Nota} from './components/Nota';
import {useEffect, useState} from 'react';
import getAllNotes from './services/Notes/getAllNotes';
import createNote from './services/Notes/createNote';


const App = () =>{
    const [notas, setNotas] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    /*
     // con fetch
     useEffect(() => {
      setLoading(true)
      setTimeout(() => {        
        fetch('https://jsonplaceholder.typicode.com/posts')          
          .then(response => response.json())
          .then(json=> setNotas(json))
          setLoading(false)
        }, 2000);
      }, [])
      // el array vacio implica que no se ejecutará solo la
      // primera vez
    */
   useEffect(() => {
     setLoading(true);
     // importamos nuestro servicio getAllNotes
     // el cual nos retorna data
     getAllNotes().then(data=>{
        setNotas(data)
        setLoading(false)
     }
    )
    //podemos limpiar el efecto con lo siguiente: 
    // return () =>{
    //     ... 
    // }
   }, [])
    const handleSubmit = (e)=>{
      e.preventDefault();

      console.log("crear nota")
      const noteToUpload = {
        // el id se genera automaticamente con json placeholder
        //id:notas.length+1,
        title: newNote,
        body:newNote,
        userId: 1
      }      
      //setNotas(prevNotas => [...prevNotas,noteToUpload])
      //setNewNote('')

      /// DATO IMPORTANTE: 
      /// CARGA OPTIMISTA: PODEMOS PINTAR EN PANTALLA ANTES DE OBTENER LA RESPUES 
      /// PARA DAR UNA MEJOR UX , COMO:  TWITTER, FACEBOOK 
      //setNotas(prevState => [...prevState, noteToUpload])
      setError(false);
      createNote(noteToUpload)
        .then( data => {
            setNotas(prev => [...prev,data])
            setNewNote('')
          }
        )
        .catch(err=>{
          console.log(err)
          setError(true)
          setNewNote('')
        })
      }

    const handleChange = (e)=>{
      setNewNote(e.target.value)    
    }

    
    return (
      <>
        <h1>Notas app</h1>    
        {
          loading ?"Cargando" : ""
        }
        
        <ol>
            {
                // el map transforma el valor : retorna algo
                // podemos usar lo siguiente, pero no controlamos lo que pasamos
                // <Nota {...nota} key={nota.id}/>
                // lo mejor es especificar las props que se desean pasar
                notas.map(nota =>
                     <Nota title={nota.title} body={nota.body} key={nota.id}/> 
                  )
            }
        </ol>
        <p style={{backgroundColor:"red"}}>{error ? 'Ha ocurrido un problema, estamos trabajando en ello ': ''}</p>
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
