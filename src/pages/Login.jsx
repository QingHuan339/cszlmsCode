// src/pages/Login.jsx
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/authSlice";

const Login = ({ switchForm }) => {
  const dispatch = useDispatch();

  // 用户名校验规则
  const usernameRules = [
    { required: true, message: "请输入用户名" },
    {
      pattern: /^[a-zA-Z0-9]{1,6}$/,
      message: "用户名必须是1-6位字母或数字",
    },
  ];

  // 密码校验规则
  const passwordRules = [
    { required: true, message: "请输入密码" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      message: "密码需包含大小写字母、数字、特殊字符，且至少6位",
    },
  ];

  // 提交表单
  const onFinish = (values) => {
    dispatch(setUserData(values));
    message.success("登录成功！");
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={usernameRules}>
        <Input placeholder="用户名" />
      </Form.Item>

      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder="密码" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        登录
      </Button>

      <Button type="link" onClick={() => switchForm("register")}>
        快速注册
      </Button>

      <Button type="link" onClick={() => switchForm("forgot")}>
        忘记密码
      </Button>
    </Form>
  );
};

export default Login;