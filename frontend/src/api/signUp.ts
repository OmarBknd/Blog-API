import api from "./api";
type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const signUpFetch = async (userData : User) => {
    try{ 
    const response = await api.post('/signup', userData)
    return response.data
} catch (error) {
    console.error('Error during signup:', error);
   
  }
}
export default signUpFetch