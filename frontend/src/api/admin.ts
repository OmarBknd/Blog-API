import api from "./api";


const approvePostStatus = async(postId:string, published: boolean) => {
    const token = localStorage.getItem('token')
    const response = await api.patch(`/admin-dashboard/posts/${postId}/status`,{published} ,{
        headers: { Authorization: `Bearer ${token}` }})
    
    
    return response.data
}

const adminFetchUsers = async() => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/admin-dashboard/users`, {
        headers: { Authorization: `Bearer ${token}` }})
    
    
    return response.data
}

const adminfetchPosts = async() => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/admin-dashboard/posts`, {
        headers: { Authorization: `Bearer ${token}` }})
    
    
    return response.data
}

const adminfetchComments = async() => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/admin-dashboard/comments`, {
        headers: { Authorization: `Bearer ${token}` }})
    
    
    return response.data
}
export {adminFetchUsers, adminfetchPosts, adminfetchComments, approvePostStatus}