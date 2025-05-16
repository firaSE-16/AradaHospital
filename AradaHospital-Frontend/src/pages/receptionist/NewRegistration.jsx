import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  DatePicker, 
  Select, 
  message, 
  Row, 
  Col, 
  Typography,
  Spin,
  Alert,
  Space,
  Divider
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const NewRegistration = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch('http://localhost:7500/api/auth/me', {
          credentials: 'include',
        });
        
        if (!userRes.ok) throw new Error("Failed to fetch user info");
        
        const userData = await userRes.json();
        console.log(userData)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const onFinish = async (values) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const formattedData = {
        ...values,
        dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
        emergencyContact: {
          name: values.emergencyContact?.name || '',
          relation: values.emergencyContact?.relation || '',
          phone: values.emergencyContact?.phone || ''
        }
      };

      const response = await axios.post(
        'http://localhost:7500/api/reception/register-patient',
        formattedData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        message.success('Patient registered successfully!');
        form.resetFields();
        navigate('/receptionist/registration');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to register patient. Please check your data.';
      
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject('Please input your phone number!');
    }
    if (!/^\d{10,15}$/.test(value)) {
      return Promise.reject('Please enter a valid phone number (10-15 digits)');
    }
    return Promise.resolve();
  };

  const validateFaydaID = (_, value) => {
    if (!value) {
      return Promise.reject('Please input Fayda ID!');
    }
    if (!/^[a-zA-Z0-9]{8,20}$/.test(value)) {
      return Promise.reject('Fayda ID must be 8-20 alphanumeric characters');
    }
    return Promise.resolve();
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(to bottom, #1A4E6B, #0D2C3E)'
      }}>
        <Spin size="large" tip="Loading registration form..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '24px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #1A4E6B, #0D2C3E)'
      }}>
        <Card
          style={{ 
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)'
          }}
        >
          <Alert
            message="Initialization Error"
            description={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: '24px' }}
          />
          <Space>
            <Button 
              type="primary" 
              onClick={() => window.location.reload()}
              style={{ marginRight: '16px' }}
            >
              Try Again
            </Button>
            <Button onClick={() => navigate('/receptionist/registration')}>
              Back to Dashboard
            </Button>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1A4E6B, #0D2C3E)'
    }}>
      <Card 
        title={
          <Space direction="vertical" size={0}>
            <Text style={{ 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              color: '#7f8fa4'
            }}>
              Patient Registration
            </Text>
            <Title level={3} style={{ margin: 0, color: '#1A4E6B' }}>
              New Patient Form
            </Title>
          </Space>
        }
        bordered={false}
        extra={
          <Button 
            type="default" 
            onClick={() => navigate('/receptionist/registration')}
            style={{ 
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            Back to Patient Search
          </Button>
        }
        headStyle={{ 
          borderBottom: 'none',
          padding: '24px 24px 0'
        }}
        bodyStyle={{ 
          padding: '16px 24px 24px'
        }}
        style={{
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
          overflow: 'hidden'
        }}
      >
        {error && (
          <Alert 
            message="Registration Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ 
              marginBottom: '24px',
              borderRadius: '8px'
            }}
          />
        )}

        <Spin spinning={submitting} tip="Registering patient...">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: '800px', margin: '0 auto' }}
            initialValues={{
              gender: 'Male'
            }}
          >
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px 24px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <Title level={5} style={{ 
                margin: 0,
                color: '#1A4E6B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  background: '#1A4E6B',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '24px',
                  fontSize: '14px'
                }}>1</span>
                Basic Information
              </Title>
            </div>
            
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label={<Text strong>Fayda ID</Text>}
                  name="faydaID"
                  rules={[
                    { required: true },
                    { validator: validateFaydaID }
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input 
                    placeholder="Enter unique Fayda ID" 
                    size="large" 
                    allowClear
                    style={{ borderRadius: '6px' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Text strong>Date of Birth</Text>}
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please select date of birth!' }]}
                >
                  <DatePicker 
                    style={{ width: '100%', borderRadius: '6px' }} 
                    size="large" 
                    disabledDate={current => current && current > moment().endOf('day')}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label={<Text strong>First Name</Text>}
                  name="firstName"
                  rules={[
                    { required: true, message: 'Please input first name!' },
                    { min: 2, message: 'First name must be at least 2 characters' },
                    { max: 50, message: 'First name cannot exceed 50 characters' }
                  ]}
                >
                  <Input 
                    placeholder="Patient's first name" 
                    size="large" 
                    allowClear
                    style={{ borderRadius: '6px' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Text strong>Last Name</Text>}
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please input last name!' },
                    { min: 2, message: 'Last name must be at least 2 characters' },
                    { max: 50, message: 'Last name cannot exceed 50 characters' }
                  ]}
                >
                  <Input 
                    placeholder="Patient's last name" 
                    size="large" 
                    allowClear
                    style={{ borderRadius: '6px' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label={<Text strong>Gender</Text>}
                  name="gender"
                  rules={[{ required: true }]}
                >
                  <Select 
                    placeholder="Select gender" 
                    size="large"
                    optionFilterProp="children"
                    style={{ borderRadius: '6px' }}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Text strong>Contact Number</Text>}
                  name="contactNumber"
                  rules={[
                    { required: true },
                    { validator: validatePhoneNumber }
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input 
                    placeholder="Patient's phone number" 
                    size="large" 
                    allowClear
                    addonBefore="+1"
                    style={{ borderRadius: '6px' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={<Text strong>Full Address</Text>}
              name="address"
              rules={[
                { required: true, message: 'Please input address!' },
                { min: 10, message: 'Address must be at least 10 characters' },
                { max: 200, message: 'Address cannot exceed 200 characters' }
              ]}
            >
              <TextArea 
                rows={3} 
                placeholder="Street address, city, state, and postal code" 
                size="large" 
                allowClear
                showCount
                maxLength={200}
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px 24px',
              borderRadius: '8px',
              margin: '32px 0 24px'
            }}>
              <Title level={5} style={{ 
                margin: 0,
                color: '#1A4E6B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  background: '#1A4E6B',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '24px',
                  fontSize: '14px'
                }}>2</span>
                Emergency Contact Information
              </Title>
            </div>
            
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label={<Text strong>Full Name</Text>}
                  name={['emergencyContact', 'name']}
                  rules={[
                    { required: true, message: 'Please input emergency contact name!' },
                    { min: 3, message: 'Name must be at least 3 characters' }
                  ]}
                >
                  <Input 
                    placeholder="Contact's full name" 
                    size="large" 
                    allowClear
                    style={{ borderRadius: '6px' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<Text strong>Relationship</Text>}
                  name={['emergencyContact', 'relation']}
                  rules={[{ required: true, message: 'Please select relationship!' }]}
                >
                  <Select 
                    placeholder="Select relationship" 
                    size="large"
                    optionFilterProp="children"
                    style={{ borderRadius: '6px' }}
                  >
                    <Option value="Parent">Parent</Option>
                    <Option value="Spouse">Spouse</Option>
                    <Option value="Sibling">Sibling</Option>
                    <Option value="Child">Child</Option>
                    <Option value="Relative">Relative</Option>
                    <Option value="Friend">Friend</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={<Text strong>Phone Number</Text>}
                  name={['emergencyContact', 'phone']}
                  rules={[
                    { required: true },
                    { validator: validatePhoneNumber }
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input 
                    placeholder="Contact's phone number" 
                    size="large" 
                    allowClear
                    addonBefore="+1"
                    style={{ borderRadius: '6px' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px 24px',
              borderRadius: '8px',
              margin: '32px 0 24px'
            }}>
              <Title level={5} style={{ 
                margin: 0,
                color: '#1A4E6B',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  background: '#1A4E6B',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '24px',
                  fontSize: '14px'
                }}>3</span>
                Medical Information
              </Title>
            </div>

            <Form.Item
              label={<Text strong>Medical History <Text type="secondary">(Optional)</Text></Text>}
              name="medicalHistory"
              rules={[
                { max: 500, message: 'Medical history cannot exceed 500 characters' }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Known medical conditions, allergies, current medications, etc." 
                size="large" 
                allowClear
                showCount
                maxLength={500}
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>

            <Divider />

            <Form.Item style={{ 
              marginTop: '24px', 
              textAlign: 'center' 
            }}>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={submitting}
                size="large"
                style={{ 
                  width: '240px', 
                  height: '48px', 
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '16px',
                  background: 'linear-gradient(to right, #1A4E6B, #0D2C3E)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(26, 78, 107, 0.3)'
                }}
                disabled={submitting}
              >
                {submitting ? 'Processing...' : 'Register Patient'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default NewRegistration;