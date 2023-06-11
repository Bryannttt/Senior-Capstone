import { useState } from "react";
import Axios from "axios";
import "./Tenants.css";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import edit from "../assets/pencil.png";
import searchIcon from "../assets/Search-Icon.png";
import openDetails from "../assets/upper-right-arrow-square-button-outlined-symbol.png";

function Tenants() {
  const [tenant, setTenant] = useState("");
  const [unit, setUnit] = useState("");
  const [meter_number, setMeterNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tenantList, setTenantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const addTenant = () => {
    Axios.post("http://localhost:3001/create", {
      tenant: tenant,
      unit: unit,
      meter_number: meter_number,
      email: email,
    }).then(() => {
      setTenantList([
        ...tenantList,
        {
          tenant: tenant,
          unit: unit,
          meter_number: meter_number,
          email: email,
        },
      ]);
      setTenant("");
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/tenants").then((response) => {
      setTenantList(response.data);
    });
  }, []);
  const searchTenant = () => {
    const foundIndex = tenantList.findIndex(
      (t) =>
        t.tenant.toLowerCase().includes(searchValue.toLowerCase()) ||
        t.meter_number.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    if (foundIndex !== -1) {
      setHighlightedIndex(foundIndex);
    } else {
      alert("No tenant found.");
      setHighlightedIndex(-1);
    }
  };
  

  // Test for console log to make sure we're getting data
  //const displayInfo = () => {
  //console.log(tenant + unit + meterNumber + email);
  // };

  return (
    // Initializing headers and labels
    <div className="availableScreen">
      <Sidebar />
      <label className="overview">Tenants Overview</label>
      <label className="addTenantsTitle">Add New Tenant</label>
      <div className="information">
        <label>Tenant: </label>
        <input
          type="text"
          className="inputSearchBarTenant"
          placeholder="Full Name"
          onChange={(event) => {
            setTenant(event.target.value);
          }}
        />

        <label> Unit: </label>
        <input
          type="text"
          className="inputSearchBarTenant"
          placeholder="ex. 24"
          onChange={(event) => {
            setUnit(event.target.value);
          }}
        />

        <label>  Meter Number: </label>
        <input
          type="text"
          className="inputSearchBarTenant"
          placeholder="ex. WHG223F"
          onChange={(event) => {
            setMeterNumber(event.target.value);
          }}
        />

        <label> Email: </label>
        <input
          type="text"
          className="inputSearchBarTenant"
          placeholder="Valid Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        {/* <label>NSWTIY:</label>
        <input type="button" className="addTen" /> */}
        <button onClick={addTenant} className="newTenantButton">Add New Tenant</button>
      </div>

      <div className="tenants">
        <div className="viewTenantsTitle">View Tenants</div>
        <div className="searchingTenantText">Search (Minimum 3 Letters)</div>
        <input
        type="name"
        id="name"
        value={searchValue}
        className="searchTenantBar"
        placeholder="Search by Name or Invoice Number"
        onChange={(event) => setSearchValue(event.target.value)}
        required
      />
      <img
        src={searchIcon}
        alt="Search Icon"
        className="searchTenantIcon"
        onClick={searchTenant}
      />
        <div className="tenTable">
          <table>
            <thead>
              <tr>
                <th>Tenant Name</th>
                <th>Unit</th>
                <th>Meter Number</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {tenantList.map((val, key) => {
                return (
                    <tr key={key} className={key === highlightedIndex ? "highlighted-row" : ""}>
                    <td>{val.tenant}</td>
                    <td>{val.unit}</td>
                    <td>{val.meter_number}</td>
                    <td>{val.email}</td>
                    <td style={{ textAlign: "right", justifyContent: "space-evenly", display: "flex", paddingTop: "18px" }}>
                      <a href="/" target="_blank" rel="noreferrer">
                        <img src={edit} alt="Edit Icon" className="imageIconResize"></img>
                      </a>
                      <a href="/" target="_blank" rel="noreferrer">
                        <img src={openDetails} alt="Open Details Icom" className="imageIconResize"></img>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Tenants;