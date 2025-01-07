import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";


function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>header Component</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
