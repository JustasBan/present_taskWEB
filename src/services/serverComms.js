import axios from "axios";

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = id => {
    const request = axios.get(baseUrl+ '/' + id)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default { getAll, getOne, create}