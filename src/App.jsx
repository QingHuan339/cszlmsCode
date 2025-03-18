import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";

const AuthContaier = lazy(() => import("./components/AuthContaier"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin size="large" />}>
        <Routes>
          <Route path="/login" element={<AuthContaier />} /> {/* 主路由指向容器 */}
          <Route path="/register" element={<AuthContaier />} />
          <Route path="/forgot-password" element={<AuthContaier />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;