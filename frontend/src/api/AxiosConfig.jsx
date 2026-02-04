import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://e-com-test-131t.onrender.com/',
    // baseURL: 'http://localhost:3000',
// 
})




export default instance;    