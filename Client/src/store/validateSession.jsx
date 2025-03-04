import axios from 'axios';

export const validateSession = async () => {
    try {
        const response = await axios.get('/api/auth/validate-session', { withCredentials: true });
        console.log("🔄 Session Validation Response: ", response);

        if (response.data.isValid) {
            console.log("✅ Session is valid!");
            return { success: true, data: response.data.data };
        } else {
            console.log("❌ Session is invalid! Logging out...");
            return { success: false, error: 'Session is invalid' }; // Return a more descriptive error
        }
    } catch (error) {
        console.error('⚠️ Session validation failed:', error);
        return { success: false, error: error.message }; // Return error message
    }
};
