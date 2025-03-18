import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

const AuthContaier = () => {
  const [currentForm, setCurrentForm] = useState("login"); // 状态管理：login/register/forgot

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      {/* 根据 currentForm 切换显示的表单 */}
      {currentForm === "login" && <Login switchForm={setCurrentForm} />}
      {currentForm === "register" && <Register switchForm={setCurrentForm} />}
      {currentForm === "forgot" && <ForgotPassword switchForm={setCurrentForm} />}
    </div>
  );
};

export default AuthContaier;