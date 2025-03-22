
import './App.css'
import React, { useEffect } from 'react';
import ActivitySelection from "./components/activitySelection"
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from './store/notificationSlice';

function App() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notification);


  // Fetch notifications when the component mounts
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  console.log("Notifications from db:", notifications)

  return (
    <>
      <ActivitySelection></ActivitySelection>
    </>
  )
}

export default App