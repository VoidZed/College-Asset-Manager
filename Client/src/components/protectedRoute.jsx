import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { validateSession } from "../store/validateSession"
import { login, logout, setLoading, unsetLoading } from '../store/authSlice';
// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAuthLoaded = useSelector((state) => state.auth.isAuthLoading); // Check if auth state is initialized
    const dispatch = useDispatch();
    const [isSessionChecked, setIsSessionChecked] = useState(false);
    console.log("protected  route", isLoggedIn)


    useEffect(() => {
        const checkSession = async () => {
            dispatch(setLoading()); // ✅ Start loading state

            const result = await validateSession(); // ✅ Call function properly

            if (result.success) {
                dispatch(login(result.data)); // ✅ Dispatch plain object
            } else {
                dispatch(logout()); // ✅ Dispatch plain object
            }

            dispatch(unsetLoading()); // ✅ Stop loading state
            setIsSessionChecked(true);
        };

        checkSession();
    }, [dispatch]);


// if (!isAuthLoaded || !isSessionChecked) {
    //     return ("Auth Checking"); // Or show a loader (e.g., <LoadingSpinner />)
    // }


    if (!isSessionChecked) {
        return <p>Checking authentication...</p>; // ✅ Show a loading message
    }

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
