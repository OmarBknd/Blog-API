import api from "./api"

type Comment = {
    content : string
    
}
const commentCreate = async (commentData : Comment, postId:string ) =>{
    try{
        const token = localStorage.getItem('token')
        const response = await api.post(`/post/${postId}/comment/create`, commentData,{
            headers: {Authorization:`Bearer ${token}`}
        })
        
        return response.data
    }catch(error) {
        console.error('Error creating comment', error);
        
    }
}

const commentDelete = async( commentId:string) =>{
    try{
        const token = localStorage.getItem('token')
        const response = await api.delete(`/post/comment/delete/${commentId}`,{
            headers: {Authorization:`Bearer ${token}`}
        })
        
        return response.data
    }catch(error) {
        console.error('Error deleting comment', error);
        
    }
}

const commentUpdate = async(commentId :string, commentData:Comment) =>{
    try{
        const token = localStorage.getItem('token')
        const response = await api.put(`/post/comment/update/${commentId}`,commentData,{
            headers: {Authorization:`Bearer ${token}`}
        })
       return response.data
    }catch (error) {
        console.error('Error updating comment', error);
     
    }
}

export {commentCreate, commentDelete, commentUpdate}