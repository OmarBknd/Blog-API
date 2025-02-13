import api from "./api";

const getPosts = async () => {
    const response = await api.get('/');
    return response.data;
}

const getProfile = async (userId: string) => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }})
    console.log(userId);
    
    return response.data
}

const changeUserPassword = async (userId:string, newPassword: string) => {
    const token = localStorage.getItem('token')
    const response = await api.put(`/profile/${userId}/password`,{
        password : newPassword
    }, {
        
        headers:{Authorization: `Bearer ${token}`}
    })
    return response.data
}
export {getPosts, getProfile, changeUserPassword}