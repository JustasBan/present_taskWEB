import axios from "axios";

const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request;
    return response.data;
}

const getOne = async id => {
    const request = axios.get(baseUrl + '/' + id)
    const response = await request;
    return response.data;
}

const create = async newObject => {
    const request = axios.post(baseUrl, newObject)
    const response = await request;
    return response.data;
}

export default { getAll, getOne, create }