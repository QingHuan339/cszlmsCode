import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/authSlice";

const Register = ({ switchForm }) => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(0); // 倒计时状态
  const [form] = Form.useForm();

  // 倒计时逻辑
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // 清理定时器
  }, [countdown]);

  // 发送验证码
  const handleSendCode = () => {
    const phone = form.getFieldValue("phone");
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      message.error("手机号格式错误");
      return;
    }
    setCountdown(30); // 启动30秒倒计时
    message.success("验证码已发送");
  };

  // 提交表单
  const onFinish = (values) => {
    dispatch(setUserData(values));
    message.success("注册成功！");
  };

  return (
    <Form form={form} onFinish={onFinish}>
      {/* 用户名 */}
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "请输入用户名" },
          { pattern: /^[a-zA-Z0-9]{1,6}$/, message: "用户名格式错误" },
        ]}
      >
        <Input placeholder="用户名" />
      </Form.Item>

      {/* 手机号 */}
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误" },
        ]}
      >
        <Input placeholder="手机号" />
      </Form.Item>

      {/* 密码 */}
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码" },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message: "密码需包含大小写字母、数字、特殊字符，且至少6位",
          },
        ]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>

      {/* 验证码 */}
      <Form.Item
        name="code"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Input placeholder="6位验证码" style={{ flex: 1 }} />
          <Button
            type="primary"
            disabled={countdown > 0} // 倒计时期间禁用按钮
            onClick={handleSendCode}
          >
            {countdown > 0 ? `${countdown}s后重试` : "发送验证码"}
          </Button>
        </div>
      </Form.Item>

      {/* 提交按钮 */}
      <Button type="primary" htmlType="submit" block>
        立即注册
      </Button>

      {/* 切换表单 */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Button type="link" onClick={() => switchForm("login")}>
          已有账号？马上登录
        </Button>
      </div>
    </Form>
  );
};

export default Register;