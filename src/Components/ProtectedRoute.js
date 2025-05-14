import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}){
    // check if account is valid by checking the cookies
    // this cookie expires after 1 hour.
    const isAuthenticated = document.cookie.includes('fetch-access-token');
    return isAuthenticated ? children : <Navigate to="/login" />;
}