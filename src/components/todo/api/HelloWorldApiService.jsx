import axios from "axios"


// export function retrieveHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }


const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

// export const retrieveHelloWorldBean = () => axios.get('http://localhost:8080/hello-world-bean')

// export const retrieveHelloWorldPathVariable =
//     (username) => axios.get(`http://localhost:8080/hello-world/path-variable/${username}`)


export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')

export const retrieveHelloWorldPathVariable =
    (username) => apiClient.get(`/hello-world/path-variable/${username}`)