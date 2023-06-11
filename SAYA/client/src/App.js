import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Analytics from "./Analytics/Analytics";
import Notifications from "./Notifications/Notifications";
import QuickActions from "./Dashboard/QuickActions";
import Billing from "./Billing/Billing";
import Hardware from "./Hardware/Hardware";
import Tenants from "./Tenants/Tenants";
import Register from "./Login/Register"
import "./App.css"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <RoutesComponent />
        </Router>
      </AuthProvider>
    </div>
  );
}

const RoutesComponent = () => {
  const { isAuthenticated, userId } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/Register" element={<Register />} />


      <Route
        path="/Dashboard"
        element={
          isAuthenticated ? (
            <Dashboard userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/Settings"
        element={
          isAuthenticated ? (
            <Settings userId={userId} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/Analytics"
        element={
          isAuthenticated ? (
            <Analytics userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/Notifications"
        element={
          isAuthenticated ? (
            <Notifications userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/Billing"
        element={
          isAuthenticated ? (
            <Billing userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/Hardware"
        element={
          isAuthenticated ? (
            <Hardware userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/Tenants"
        element={
          isAuthenticated ? (
            <Tenants userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/QuickActions"
        element={
          isAuthenticated ? (
            <QuickActions userId={userId}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
    
  );
};

export default App;
