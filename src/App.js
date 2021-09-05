import {Nota} from './components/Nota';
import {useEffect, useState} from 'react';
/* import getAllNotes from './services/Notes/getAllNotes';
import createNote from './services/Notes/createNote'; */
import {getAllNotes, createNote, updateNote} from './services/Notes/notes';


const App = () =>{
    const [notas, setNotas] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(true);
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

   const handleImportance = (id)=>{
     const note= notas.find(n=> n.id ===id)
     const contentToUpdate= {...note, important: !note.important}
     updateNote(id,contentToUpdate)
      .then(newNote =>{
        setNotas(notas.map(nota => nota.id===id ? newNote: nota))
      })
   }  

    const handleSubmit = (e)=>{
      e.preventDefault();

      console.log("crear nota")
      /* const noteToUpload = {
        // el id se genera automaticamente con json placeholder
        //id:notas.length+1,
        title: newNote,
        body:newNote,
        userId: 1
      } 
       */
      const notePrueba ={        
        content: newNote,
        important: Math.random() > 0.5 
    }
      //setNotas(prevNotas => [...prevNotas,noteToUpload])
      //setNewNote('')

      /// DATO IMPORTANTE: 
      /// CARGA OPTIMISTA: PODEMOS PINTAR EN PANTALLA ANTES DE OBTENER LA RESPUES 
      /// PARA DAR UNA MEJOR UX , COMO:  TWITTER, FACEBOOK 
      //setNotas(prevState => [...prevState, noteToUpload])
      setError(false);
      createNote(notePrueba)
        .then( data => {
            console.log({data})
            setNotas(notas.concat(data))
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
        <button onClick={()=>setShowAll(prev=> !prev)}>{showAll ? 'Show importants' : 'Show all'}</button>
        
        <ol>
            {
                // el map transforma el valor : retorna algo
                // podemos usar lo siguiente, pero no controlamos lo que pasamos
                // <Nota {...nota} key={nota.id}/>
                // lo mejor es especificar las props que se desean pasar
                notas
                .filter(nota=>{
                  if(showAll===true){
                    return true
                  }
                  return nota.important === true
                })
                .map((nota,i) =>                     
                     <Nota content={nota.content} important={nota.important} id={nota.id} key={i} toogleImportance={()=>handleImportance(nota.id)}/>
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
