import api from "./api";

type Post = {
    title : string,
    content: string
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

const postUpdate = async(postId :string, postData:Post) =>{
    try{
        const token = localStorage.getItem('token')
        const response = await api.put(`/post/update/${postId}`,postData,{
            headers: {Authorization:`Bearer ${token}`}
        })
       return response.data
    }catch (error) {
        console.error('Error updating post', error);
     
    }
}

const postDelete = async (postId: string) => {
    try{
        const token = localStorage.getItem('token')
        const response = await api.delete(`/post/delete/${postId}`,{
            headers: {Authorization:`Bearer ${token}`}

        })
        return response.data
    }catch (error) {
        console.error('Error deleting post', error);
}
}

export  {postCreate, postGetByUserId, postUpdate, postDelete }