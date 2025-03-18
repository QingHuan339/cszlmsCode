// src/pages/ForgotPassword.jsx
import { Form, Input, Button } from "antd";

const ForgotPassword = ({ switchForm }) => {
  return (
    <Form>
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

      {/* 新密码 */}
      <Form.Item
        name="newPassword"
        rules={[
          { required: true, message: "请输入新密码" },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            message: "密码需包含大小写字母、数字、特殊字符，且至少6位",
          },
        ]}
      >
        <Input.Password placeholder="新密码" />
      </Form.Item>

      {/* 验证码 */}
      <Form.Item
        name="code"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <Input placeholder="6位验证码" />
      </Form.Item>

      {/* 提交按钮 */}
      <Button type="primary" block>
        确定
      </Button>

      {/* 切换表单 */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <Button type="link" onClick={() => switchForm("login")}>
          立即登录
        </Button>
        <Button type="link" onClick={() => switchForm("register")}>
          快速注册
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPassword;