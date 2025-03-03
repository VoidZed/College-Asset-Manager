import React,{useEffect,useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {validateSession} from "../store/validateSession"
// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAuthLoaded = useSelector((state) => state.auth.isAuthLoading); // Check if auth state is initialized
    const dispatch = useDispatch();
    const [isSessionChecked, setIsSessionChecked] = useState(false);
    console.log("protected  route",isLoggedIn)


    useEffect(() => {
        const checkSession = async () => {
            await validateSession(dispatch); // Pass dispatch to function
            setIsSessionChecked(true); // Update state after checking session
        };

        checkSession();
    }, [dispatch]);


    // if (!isAuthLoaded || !isSessionChecked) {
    //     return ("Auth Checking"); // Or show a loader (e.g., <LoadingSpinner />)
    // }

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
