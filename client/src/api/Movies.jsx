import axios from 'axios'
const baseURL = process.env.NODE_ENV === 'production' ? '/movies' : 'http://localhost:5000/movies';
export default axios.create({
     baseURL
});

