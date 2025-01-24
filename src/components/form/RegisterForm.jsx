import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterForm = () => {
    // إضافة الحقول الجديدة إلى الـ state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        companyName: '',
        phone: '',
        eventName: '',
        eventType: '',
        preferredDate: '',
        eventDuration: '',
        expectedAttendees: '',
        venueLocation: '',
        hasVenue: '',
        venueName: '',
        servicesRequired: '',
        additionalComments: ''
    });

    const BaseUrl = process.env.REACT_APP_BASE_URL;

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isFormSent, setIsFormSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BaseUrl}/messages`, formData);
            setResponseMessage('Message sent successfully!');
            setIsFormSent(true);
            toast.success("Thank you for filling out the form. Our team will review your request and reach out to you shortly!");
        } catch (error) {
            setResponseMessage('Failed to send message. Please try again.');
        }

        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Personal Information</h3>
                <div className="form-group">
                    <span className="icon fa fa-user"></span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        autoComplete="off"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-building"></span>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name (if applicable)"
                        autoComplete="off"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-envelope"></span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        autoComplete="off"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-phone"></span>
                    <input
                        type="number"
                        name="phone"
                        className="no-arrows"
                        placeholder="Phone Number"
                        autoComplete="off"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h3>Event Details</h3>
                <div className="form-group">
                    <span className="icon fa fa-calendar"></span>
                    <input
                        type="text"
                        name="eventName"
                        placeholder="Event Name/Title"
                        autoComplete="off"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-list"></span>
                    <input
                        type="text"
                        name="eventType"
                        placeholder="Type of Event (e.g., Conference, Workshop)"
                        autoComplete="off"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-clock"></span>
                    <input
                        type="text"
                        name="preferredDate"
                        placeholder="Preferred Event Date(s)"
                        autoComplete="off"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-hourglass"></span>
                    <input
                        type="text"
                        name="eventDuration"
                        placeholder="Event Duration (No. of Days)"
                        autoComplete="off"
                        value={formData.eventDuration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-users"></span>
                    <input
                        type="number"
                        name="expectedAttendees"
                        placeholder="Expected Number of Attendees"
                        autoComplete="off"
                        value={formData.expectedAttendees}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h3>Venue Details</h3>
                <div className="form-group">
                    <span className="icon fa fa-map-marker"></span>
                    <input
                        type="text"
                        name="venueLocation"
                        placeholder="Preferred Venue Location (City/Country)"
                        autoComplete="off"
                        value={formData.venueLocation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-check"></span>
                    <select
                        name="hasVenue"
                        value={formData.hasVenue}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Do you already have a venue?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <span className="icon fa fa-building"></span>
                    <input
                        type="text"
                        name="venueName"
                        placeholder="If yes, Venue Name"
                        autoComplete="off"
                        value={formData.venueName}
                        onChange={handleChange}
                    />
                </div>

                <h3>Additional Information</h3>
                <div className="form-group">
                    <span className="icon fa fa-tasks"></span>
                    <textarea
                        name="servicesRequired"
                        placeholder="Services Required (Please check all that apply)"
                        autoComplete="off"
                        value={formData.servicesRequired}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <span className="icon fa fa-comment"></span>
                    <textarea
                        name="additionalComments"
                        placeholder="Additional Requirements or Comments"
                        autoComplete="off"
                        value={formData.additionalComments}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group text-end">
                    <button type="submit" className="theme-btn btn-style-four" disabled={loading}>
                        <span className="btn-title">Register Now</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
