import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




// Async thunk to handle adding a notification
export const createNotification = createAsyncThunk(
  'notifications/createNotification',
  async (notification, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/create-notification', notification);
      console.log("Notification Createnotification: ",response.data)
      return response.data.data; // return saved notification data
    } catch (error) {
      return rejectWithValue(error.message); // reject with error message
    }
  }
);




// Async thunk to handle fetching notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/get-notification', { withCredentials: true });
      console.log("get notification:",response.data)
      return response.data.data; // Assuming the server sends back the notifications in response.data
    } catch (error) {
      return rejectWithValue(error.message); // reject with error message
    }
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    // Normal reducer to add a notification to the state (if not using createAsyncThunk for this)
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when fetching starts
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload; // Set notifications in state
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture error from the rejected thunk
      })
      
      // Handle creating a notification
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload); // Add new notification to state
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture error from the rejected thunk
      });
  },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
