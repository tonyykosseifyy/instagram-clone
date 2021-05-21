import axios from 'axios';

export const BASE_URL = 'https://dummyapi.io/data/api';
export const APP_ID = '606446b5df2e4d6a437db9f6' ;

const another = '60631baa274d19da9184ae04'

export const getUsersSuggestion = ( handleData , handleError ) => {
    axios.get(`${BASE_URL}/user?limit=5`, { headers: { 'app-id': APP_ID } })
        .then(({ data }) => {
            handleData(data.data) 
            handleError(false)
        })
        .catch(error => {
            handleError(true)
        })
} ;
export const getFullUserById = ( handleData , handleError , id , setLoading) => {
    setLoading(true)
    axios.get(`${BASE_URL}/user/${id}`, { headers: { 'app-id': APP_ID } })
        .then(({ data }) => {
            handleData(data) 
            handleError(false)
            setLoading(false)
        })
        .catch(error => {
            handleError(true)
            setLoading(false)
        })
} ;

export const getUsersPostsById = ( handleData , handleError , id , setLoadingPosts) => {
    setLoadingPosts(true)
    axios.get(`${BASE_URL}/user/${id}/post?limit=5`, { headers: { 'app-id': APP_ID } })
        .then(({ data }) => {
            handleData(data.data) 
            handleError(false)
            setLoadingPosts(false)
        })
        .catch(error => {
            handleError(true)
            setLoadingPosts(false)
        })
} ;
export const getRandomPosts = ( handleData , handleError , setLoading) => {
    setLoading(true)
    axios.get(`${BASE_URL}/post?limit=5`, { headers: { 'app-id': APP_ID } })
        .then(({ data }) => {
            handleData(data.data) 
            handleError(false)
            setLoading(false)
        })
        .catch(error => {
            handleError(true)
            setLoading(false)
        })
} ;

export const getPostComments = ( handleData , handleError ,id ,  setLoading) => {
    setLoading(true)
    axios.get(`${BASE_URL}/post/${id}/comment?limit=30`, { headers: { 'app-id': APP_ID } })
        .then(({ data }) => {
            handleData(data.data)
            handleError(false)
            setLoading(false)
        })
        .catch(error => {
            handleData([]) 
            handleError(true)
            setLoading(false)
        })
} ;