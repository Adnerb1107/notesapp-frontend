import axios from "axios"
export default function createNote({title, body, userId}) {
    // forzamos un error así:
    //return Promise.reject('Something bad happend');
    return (
        axios.post('https://jsonplaceholder.typicode.com/posts',{title, body, userId})
        .then(response =>{
            const {data} = response;
            return data;
        })
    )
}
