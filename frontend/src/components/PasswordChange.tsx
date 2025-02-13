import { useState } from "react";
import { changeUserPassword } from "../api";

const PasswordChange = () => {
    const [password, setPassword] = useState("");
    const userId = localStorage.getItem("userId"); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!userId) {
            alert("User not logged in.");
            return;
        }

        try {
           await changeUserPassword(userId, password)
           alert('password changed')
           setPassword('')
                
            } catch (error) {
            console.error("Error:", error);
            alert("Error updating password");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="password">New Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
            />
            <button type="submit">Change Password</button>
        </form>
    );
};

export default PasswordChange;
