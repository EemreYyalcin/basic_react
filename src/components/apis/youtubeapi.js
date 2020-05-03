import axios from 'axios';
const KEY = 'AIzaSyChWxmHWO2a3Sf7-otB7nzUBNjnqfyIsPs';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 25,
        key: KEY
    }
})