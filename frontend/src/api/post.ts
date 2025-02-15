import api from "./api";

type Post = {
    title : string,
    content: string
}
type Comment = {
    content : string
    
}

const postGetByUserId = async(userId:string) => {
    try{
        
        const response = await api.get(`/post/user/${userId}`)
        return response.data
    }catch (error) {
        console.error('Error Fetching user posts', error);
     
    }
    
}

const postCreate = async (postData : Post) => {
        try{ 
        const token = localStorage.getItem('token')
       
        const response = await api.post('/post/create', postData,{
            headers:{Authorization:`Bearer ${token}`}
        })
        console.log('post response', response);
        
        return response.data
} catch (error) {
        console.error('Error creating post:', error);
     
    }
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
export  {postCreate, commentCreate, commentDelete, postGetByUserId, }