import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

let axiosInstance = axios.create({
    baseURL: "https://budgerthero.herokuapp.com/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});
AsyncStorage.getItem('x-auth-token').then(item=>{
    console.log('tokem', item)
    if (item) {
        axiosInstance.defaults.headers.common["x-auth-token"] = item
    }else{
        axiosInstance.defaults.headers.common["x-auth-token"] = ""
    }
})

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

const errorHandler = (error) => {
    return Promise.reject({ ...error });
};

const successHandler = (response) => {
    return response;
};
export default axiosInstance;