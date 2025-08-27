import axios from "axios";


export const api = axios.create({
    baseURL : "https://kerala-huj-backend.onrender.com",
      withCredentials: true,

})

