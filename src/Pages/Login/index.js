import React, { useState } from "react";
import { Form, Input, Button, Typography, Space, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [isOTPSend, setIsOTPSend] = useState(false);

  const handleSendOTP = async () => {
    if (phone) {
      try {
        setLoading(true);
      
      console.log('phone');
      setIsOTPSend(isOTPSend => !isOTPSend)
      } catch (error) {
        message.warning("Please Provide valid Phone Number!");
      }
    } else {
      message.warning("Please Provide Phone Number!");
    }
  };

  const handleVerifyOTP = async () => {
    if (otp) {
      try {


        console.log('otp');
      } catch (error) {
        message.error("Error Occurred: " + error.response.data.message);
        setLoading(false);
      }
    } else {
      message.warning("Please Provide OTP!");
    }
  };

  const handleSubmit = async () => {
    console.log('submit');
  };

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <Space size="5px" direction="vertical">
        <Title level={4}>Admin (Locked)</Title>
        <Form>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter your phone number" }]}>
            <Input placeholder="Enter Your Phone" onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={handleSendOTP}>
              Send OTP
            </Button>
          </Form.Item>
          {isOTPSend ? (
            <>
              <Form.Item label="Enter OTP:" name="otp" rules={[{ required: true, message: "Please enter your OTP" }]}>
                <Input placeholder="Enter Your OTP here" onChange={(e) => setOtp(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="button" onClick={handleVerifyOTP}>
                  Verify OTP
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Typography.Text strong>OR LOGIN USING EMAIL AND PASSWORD</Typography.Text>
              <Form.Item label="Username" name="email" rules={[{ required: true, message: "Please enter your username" }]}>
                <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                <Input.Password
                  placeholder="Enter Your Password"
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="button" onClick={handleSubmit} loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Space>
    </div>
  );
};

export default Login;