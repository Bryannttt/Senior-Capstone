import Axios from "axios";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Notifications.css";
import { useEffect } from "react";
import searchIcon from "../assets/Search-Icon.png"
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';

function Notifications() {
  const [notificationList, setNotificationList] = useState([]);
  const [popup, setPop] = useState(false);
  const [meter_number, setMeterNumber] = useState("");
  const [message, setMessage] = useState("");
  const [unit_number, setUnitNumber] = useState("");
  const [notification_type, setNotificationType] = useState("");
  const [notification_local_time, setTime] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const location = useLocation();
  const highlightedRowId = location.state?.highlightedRowId;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);


  const getLocalTime = () => {
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');
    setTime(formattedTime);
  };
  const openPopup = () => {
    setPop(!popup);
    getLocalTime();
  }
  const closePop = () => {
    setPop(false);
  }
  const createNoti = async () => {
    Axios.post("http://localhost:3001/createNoti", {
      notification_type,
      unit_number,
      meter_number,
      message,
      notification_local_time,
    }).then((response) => {
      console.log(response.data);
      if (response.data.message === 'Notification created successfully.') {
        setRefresh(!refresh);
      }
    });
    closePop();
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/notifications").then((response) => {
      setNotificationList(response.data);

    });
  }, [refresh]);
  

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return format(dateObj, 'MM/dd/yy h:mm aa');
  };

  const searchNotification = () => {
    const foundIndex = notificationList.findIndex(
      (n) =>
        n.meter_number.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    if (foundIndex !== -1) {
      setHighlightedIndex(foundIndex);
    } else {
      alert("No notification found.");
      setHighlightedIndex(-1);
    }
  };

  return (
    <div className="availableScreen">
      <Sidebar />
      <label className="overview">Notification Mangager |</label>
      <label className={`notificationButtonStatus ${
        notificationsEnabled ? "notificationButtonStatusOn" : "notificationButtonStatusOff"}`}>
        Status: {notificationsEnabled ? "Off" : "On"}
</label>

   
      <button className="CreateNew" onClick={openPopup}>Create New Notification</button>
      <div>
  {popup ? (
    <div className="dark-background">
      <div className="popUp">
        <div className="popped">
          <div className="header">
            <h1>New Notification</h1>
            <h1 onClick={closePop}>X</h1>
          </div>
          <div className="labels">
            <h2>Notification Type</h2>
            <input
              type="text"
              className="typeN"
              onChange={(e) => setNotificationType(e.target.value)}
            ></input>
            <h2>Unit Number</h2>
            <input
              type="text"
              className="typeN"
              onChange={(e) => setUnitNumber(e.target.value)}
            ></input>
            <h2>Meter Number</h2>
            <input
              type="text"
              className="typeN"
              onChange={(e) => setMeterNumber(e.target.value)}
            ></input>
          </div>
          <div className="preview">
            <h2>Notification Preview</h2>
            <input
              type="text"
              className="message"
              placeholder="Attention [Tenant], This is a test notification!"
              onChange={(e) => setMessage(e.target.value)}
            ></input>
          </div>
          <button className="makeNoti" onClick={createNoti}>
            Send
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  )}
</div>

      <div className="switchButton">
        <p>Notifications Enabled?</p>
        <label className="switch">
        <input
          type="checkbox"
          checked={notificationsEnabled}
          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
        />
          <span className="slider round"></span>
        </label>
      </div>
      <label className="NotiHistory">Notification History</label>
      <label className="Search">Search (Enter minimum 3 letters)</label>
      <label className="ToDate">To Date</label>

      <input type="text" className="SearchBy" placeholder="Search by Gateway or Meter" value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}></input>
      <input type="text" className="FromDate" placeholder="From Date"></input>
      <input type="text" className="DateTo" placeholder="End Date"></input>
      <img src={searchIcon} alt="Search Icon" className="searchNotificationIcon" onClick={searchNotification}></img>

      <div>
        <table className="notiTable">
          <thead>
            <tr>
              <th>Meter Number</th>
              <th>Message</th>
              <th>Unit #</th>
              <th>Notification</th>
              <th>Time</th> 
            </tr>
          </thead>
          <tbody>
            {notificationList.map((val, key) => {
              const isHighlighted = val.id === highlightedRowId;
              return (
                <tr key={key}  className={key === highlightedIndex || (isHighlighted && highlightedIndex === -1)
                  ? "highlighted-row"
                  : ""} >
                <td>{val.meter_number}</td>
                  <td>{val.message}</td>
                  <td>{val.unit_number}</td>
                  <td>{val.notification_type}</td>
                  <td>{formatDate(val.notification_local_time)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notifications;