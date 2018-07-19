import axios from 'axios';

var instance = axios.create({
    baseURL: 'http://192.168.46.104:8090/Noninstrusive/data/',
    timeout: 5000,
});

instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    if (error.response) {

    }
    // Do something with response error
    return Promise.reject(error);
});

export default instance;
