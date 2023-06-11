import "./Settings.css"
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = ({ userId }) => {
  const [account_name, setAccount] = useState('');
  const [code, setCode] = useState('');
  const [invoice, setInvoice] = useState('');
  const [phone, setPhone] = useState('');
  const [first_name, setName] = useState('');
  const [last, setLast] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

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

  const update = (event) => {
    event.preventDefault();
    if (!account_name || !code || !phone || !first_name || !last || !password) {
      alert('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }
    Axios.post("http://localhost:3001/settings", {
      userId,
      code,
      phone,
      account_name,
      invoice,
      first_name,
      last,
      password,
    }).then((response) => {
      if (response.data.message === "User updated successfully.") {
        alert("User Information Updated Successfully");
        navigate("/Dashboard");
      } else {
        alert(response.data.message);
      }
    });
  };

  const dash = () => {
    navigate("/Dashboard")
  }

  return (
    //put className='back' to make the background white
    <div className="Background">
      <form onSubmit={update}>
        <h1 className='Info'>Update Account Information</h1>
        <label className='Name'>Account Name *</label>
        <label className='Email'>Email</label>
        <label className='Code'>Country Code *</label>
        <label className='Phone'>Phone Number</label>
        <label className='Invoice'>Invoice Name Prefix</label>
        <label className='Main'>Main Account</label>

        <input type='text' className='AccName' placeholder={userData.account_name} onChange={(e) => { setAccount(e.target.value) }}></input>
        <input type="text" className='Mail' placeholder={userData.email} maxLength={0}></input>
        <input type='text' className='Country' placeholder={userData.country_code} onChange={(e) => { setCode(e.target.value) }}></input>
        <input type='text' className='Number' placeholder={userData.phone_number} onChange={(e) => { setPhone(e.target.value) }}></input>
        <input type='text' className='Prefix' placeholder={userData.invoice_name_prefix} onChange={(e) => { setInvoice(e.target.value) }}></input>
        <input type='text' className='MainAcc' placeholder={userData.account_name} maxLength={0}></input>

        <h1 className='User'>Update User Information</h1>
        <label className='First'>First Name *</label>
        <label className='Last'>Last Name *</label>
        <label className='Email2'>Email</label>
        <label className='Password'>Password</label>
        <label className='Confirm'>Confirm Password</label>
        <label className='Date'>Date Format *</label>

        <input type='text' className='FirstIn' placeholder={userData.first_name} onChange={(e) => { setName(e.target.value) }}></input>
        <input type='text' className='LastIn' placeholder={userData.last_name} onChange={(e) => { setLast(e.target.value) }}></input>
        <input type='text' className='EmailIn' placeholder={userData.email} maxLength={0}></input>
        <input className='Pass' placeholder='< ********** >' type='password' onChange={(e) => { setPassword(e.target.value) }}></input>
        <input className='ConfirmPass' placeholder='< ********** >' type='password' onChange={(e) => { setConfirmPassword(e.target.value); }}></input>
        <input type="date" className='Format' placeholder='< Date Format >'></input>

        <button className='settingSaveButton' type='submit'>Save</button>
        <button className='settingCancelButton' onClick={dash} >Cancel</button>

        <Sidebar />
      </form>
    </div>
  );
}

export default Settings;


