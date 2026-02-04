import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://e-com-test-uc5z.onrender.com',
    // baseURL: 'http://localhost:3000',
// 
})




export default instance;    