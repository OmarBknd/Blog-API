import api from "./api";

const getPosts = async () => {
    const response = await api.get('/');
    return response.data;
}

const getProfile = async (userId: string) => {
    const response = await api.get(`/profile/${userId}`)
    console.log(userId);
    
    return response.data
}

export {getPosts, getProfile}