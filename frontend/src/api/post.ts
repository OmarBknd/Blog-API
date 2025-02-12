import api from "./api";

type Post = {
    title : string,
    content: string
}

const postFetch = async (postData : Post) => {
        try{ 
        const response = await api.post('/post', postData)
        return response.data
} catch (error) {
        console.error('Error during signup:', error);
     
    }
}

export default postFetch