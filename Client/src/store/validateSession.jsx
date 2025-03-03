import axios from 'axios';
import { login, logout, setLoading, unsetLoading } from './authSlice';

export const validateSession = async (dispatch) => {
    dispatch(setLoading()); // Start loading state

    try {
        const response = await axios.get('/api/auth/validate-session', { withCredentials: true });

        console.log("🔄 Session Validation Response: ", response);

        if (response.data.isValid) {
            console.log("✅ Session is valid!");
            dispatch(login(response.data.data)); // refresh the original state
            return true; // Return true if session is valid
        } else {
            console.log("❌ Session is invalid! Logging out...");
            dispatch(logout());
            return false; // Return false if session is invalid
        }
    } catch (error) {
        console.error('⚠️ Session validation failed:', error);
        dispatch(logout()); // Logout on failure
        return false;
    } finally {
        dispatch(unsetLoading()); // Stop loading state
    }
};


