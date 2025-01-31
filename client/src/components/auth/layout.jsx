import { Outlet } from "react-router-dom";
import './AuthLayout.css'; // Import the CSS file

function AuthLayout() {
  return (
    <div className="auth-container w-[120rem]">
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
