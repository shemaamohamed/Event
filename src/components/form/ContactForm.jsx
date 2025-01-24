import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isFormSent, setIsFormSent] = useState(false);

  const BaseUrl = process.env.REACT_APP_BASE_URL;

  // التعامل مع تغييرات الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // التعامل مع إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/messages`, formData);
      setResponseMessage('Message sent successfully!');
      setIsFormSent(true);
      toast.success("Message Sent!");
    } catch (error) {
      setResponseMessage('Failed to send message. Please try again.');
      toast.error("Message Failed");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="inner-column">
        <div className="contact-form">
          <div className="sec-title">
            <h2>Get in Touch</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row clearfix">
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}  // ربط القيمة
                  placeholder="Name"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}  // ربط القيمة
                  className="no-arrows"
                  placeholder="Phone"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}  // ربط القيمة
                  placeholder="Email"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}  // ربط القيمة
                  placeholder="Subject"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <textarea
                  name="message"
                  value={formData.message}  // ربط القيمة
                  placeholder="Message"
                  autoComplete="off"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                <button
                  className="theme-btn btn-style-one"
                  type="submit"
                  name="submit-form"
                  disabled={loading}
                >
                  <span className="btn-title">
                    {loading ? 'Sending...' : 'Submit Now'}
                  </span>
                </button>
              </div>
            </div>
          </form>
          {responseMessage && (
            <div className="response-message">
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactForm;
