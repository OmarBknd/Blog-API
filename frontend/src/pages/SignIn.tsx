import signInFetch from "../api/signIn"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const SignIn = () => {
  const navigate = useNavigate()
type User = {
    email: string;
    password: string;
}

    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        console.log(formData)
        try {
           const response = await signInFetch(formData); // Use the signUpFetch function
            if(response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.user.id)
            }
            navigate(`/profile/${response.user.id}`);
        }catch (error) {
            console.error('Signup failed:', error);
        }
      };

    return (
        <>
        <div className="flex flex-row justify-between items-center bg-gray-800 p-4">
            
           <form action="/signin" method="post" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Log in</button>
           </form>
        </div>
        </>
    )
}

export default SignIn