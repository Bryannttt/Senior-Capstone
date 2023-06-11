/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Axios from "axios";
import "./Billing.css";
import { useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import { useEffect } from "react";
import searchIcon from '../assets/Search-Icon.png';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Billing = ({ userID }) => {
  const [chargesList, setChargesList] = useState([]);
  const [name, setName] = useState("");
  const [invoice_num, setInvoiceNum] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [payable_amount, setPayableAmount] = useState("");
  const [bill_month, setBillMonth] = useState("");
  const [status, setStatus] = useState("");
  const [due_date, setDueDate] = useState("");
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/billing", {}).then((response) => {
      setChargesList(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/notifications").then((response) => {
      setNotificationList(response.data);
    });
  }, []);
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return format(dateObj, 'MM/dd/yy h:mm aa');
  };
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate('/Notifications', { state: { highlightedRowId: id } });
  };

  return (
    <div className="availableScreen">
      <Sidebar />
      <div className="overview">Billing Overview</div>
      <div className="billNoti">
        <label className='Noti'>Notifications</label>
        <Link to="/Notifications" className='See'>See All</Link>
        <div className="theNotis">
      <table className="billingT">
        <tbody>
          {notificationList.slice(0, 3).map((val, key) => {
            return (
              <tr key={key} className='allN' onClick={() => handleRowClick(val.id)}>
                <td className='unitN'>{`Unit ${val.unit_number}`}</td>
                <td className="notiType">{val.notification_type}</td>
                <td className='dateNum'>{formatDate(val.notification_local_time)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
      </div>
      <div className="BillingH">Billing History</div>
      <div className="Searching">Search (Minimum 3 Letters)</div>
      <input
        type="name"
        id="name"
        value={name}
        className="SearchH"
        placeholder='Search by Name or Invoice Number'
        onChange={(event) => setName(event.target.value)}
        required
      />
      <a href="/" target="_blank" rel="noreferrer">
        <img src={searchIcon} alt="Coding Beauty logo" className="searchBillingIcon"></img>
      </a>
      <div className="tenantsBoard">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Invoice Number</th>
              <th>Total Amount</th>
              <th>Payable Amount</th>
              <th>Bill Month</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {chargesList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.invoice_num}</td>
                  <td>{val.total_amount}</td>
                  <td>{val.payable_amount}</td>
                  <td>{val.bill_month}</td>
                  <td>{val.status}</td>
                  <td>{val.due_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;