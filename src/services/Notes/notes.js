import axios from "axios"
const baseUrl= 'http://localhost:3001/api/notes'
function getAllNotes() {
    
    return (       
        axios.get(baseUrl)
        .then((response) =>{
            const {data} = response
            return data;
        })    
    )
}
function createNote(nuevaNotaPrueba) {
    // forzamos un error así:
    //return Promise.reject('Something bad happend');
    return (
        axios.post(baseUrl,nuevaNotaPrueba)
        .then(response =>{
            const {data} = response;
            return data;
        })
    )
}
function updateNote(id,newObject){
    return (
        axios.put(`${baseUrl}/${id}`,newObject)
            .then(response =>response.data)
    )

}
export {
    createNote,
    getAllNotes,
    updateNote
}