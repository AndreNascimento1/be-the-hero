import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', //é adicionado o padrão de todas as chamadas URL
})

export default api;