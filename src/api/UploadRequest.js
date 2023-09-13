import axios from 'axios';

export const API=axios.create({localhost:'5000'});

export const uploadImage = (data) => API.post("/upload", data);

export const uploadPost = (data) => API.post("/post",data);
