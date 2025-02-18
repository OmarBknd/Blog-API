import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoute = () => {

    const token = localStorage.getItem('token')
    
    
    const userRole = localStorage.getItem('userRole')

    

    if(!token){
        return <Navigate to='/signin' replace />
    }
    if(userRole !=='ADMIN'){
        return <Navigate to='/' replace />
    }
    return <Outlet />
}

export default AdminProtectedRoute