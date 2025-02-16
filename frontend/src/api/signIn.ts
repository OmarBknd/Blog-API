import api from "./api";
import {AxiosError} from 'axios'
type User = {
    email : string,
    password: string
}

const signInFetch = async (userData: User) => {
    try { 
        console.log("Sending data:", userData);  
        const response = await api.post('/signin', userData);
        console.log("Login successful! Response:", response.data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError){ 
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
}
};



export default signInFetch