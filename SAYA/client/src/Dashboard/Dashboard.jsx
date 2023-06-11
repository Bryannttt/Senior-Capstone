import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import QuickActions from './QuickActions';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChartComponent from '../Analytics/ChartComponent';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Dashboard = ({ userId }) => {
  const [date, setDate] = React.useState(new Date());
  const [userData, setUserData] = useState({});
  const [notificationList, setNotificationList] = useState([]);

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate('/Notifications', { state: { highlightedRowId: id } });
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:3001/notifications");
      setNotificationList(response.data);
    } catch (error) {
      console.error("Error fetching notifications data:", error);
    }
  };
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return format(dateObj, 'MM/dd/yy h:mm aa');
  };
  
  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    //put className='back' to make the background white
    <div className="availableScreen">
      <h1 className='dashboard'>{`Welcome ${userData.account_name}`}</h1>
      <Calendar onChange={onChange} value={date} />
      <div className='notificationBoard'>
        <label className='Noti'>Notifications</label>
        <Link to="/Notifications" className='See'>See All</Link>
        <div className="notificationPreview">
      <table className='table-cell'>
        <tbody>
          {notificationList.slice(0, 6).map((val, key) => {
            return (
              <tr key={key} className='allN' onClick={() => handleRowClick(val.id)}>
                <td className='unitNum'>{`Unit ${val.unit_number}`}</td>
                <td>{val.notification_type}</td>
                <td className='dateN'>{formatDate(val.notification_local_time)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
      </div>
      <Sidebar />
      <QuickActions />
      <div className='analyticsBord'>
        <ChartComponent/>
      </div>
    </div>
  );
};

export default Dashboard;