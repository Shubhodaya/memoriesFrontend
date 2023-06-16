import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const bURL=process.env.newURL;

const API = axios.create({baseURL: bURL });

API.interceptors.request.use((req) =>{

    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

    }

    return req;
})



export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const comment = (value,id) => API.post(`/posts/${id}/commentPost`, {value});
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none' }&tags=${searchQuery.tags}`);
export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);