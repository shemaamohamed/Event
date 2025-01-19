import React from 'react';
import { toast } from 'react-toastify';

const RegisterForm = () => {

    const handleSearch = (event) => {
        event.preventDefault()
        event.target.reset()
        toast.success("Thank you for filling out the form. Our team will review your request and reach out to you shortly!")
    }

    return (
        <>
              <form onSubmit={handleSearch}>
                <h3>Personal Information</h3>
                <div className="form-group">
                    <span className="icon fa fa-user"></span>
                    <input type="text" name="username" placeholder="Full Name" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-building"></span>
                    <input type="text" name="companyName" placeholder="Company Name (if applicable)" autoComplete="off" />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-envelope"></span>
                    <input type="email" name="email" placeholder="Email Address" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-phone"></span>
                    <input type="number" name="phone" className="no-arrows" placeholder="Phone Number" autoComplete="off" required />
                </div>

                <h3>Event Details</h3>
                <div className="form-group">
                    <span className="icon fa fa-calendar"></span>
                    <input type="text" name="eventName" placeholder="Event Name/Title" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-list"></span>
                    <input type="text" name="eventType" placeholder="Type of Event (e.g., Conference, Workshop)" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-clock"></span>
                    <input type="text" name="preferredDate" placeholder="Preferred Event Date(s)" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-hourglass"></span>
                    <input type="text" name="eventDuration" placeholder="Event Duration (No. of Days)" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-users"></span>
                    <input type="number" name="expectedAttendees" placeholder="Expected Number of Attendees" autoComplete="off" required />
                </div>

                <h3>Venue Details</h3>
                <div className="form-group">
                    <span className="icon fa fa-map-marker"></span>
                    <input type="text" name="venueLocation" placeholder="Preferred Venue Location (City/Country)" autoComplete="off" required />
                </div>
                <div className="form-group">
                    <span className="icon fa fa-check"></span>
                    <select name="hasVenue" required>
                        <option value="">Do you already have a venue?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <span className="icon fa fa-building"></span>
                    <input type="text" name="venueName" placeholder="If yes, Venue Name" autoComplete="off" />
                </div>

                <h3>Additional Information</h3>
                <div className="form-group">
                    <span className="icon fa fa-tasks"></span>
                    <textarea
                        name="servicesRequired"
                        placeholder="Services Required (Please check all that apply)"
                        autoComplete="off"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <span className="icon fa fa-comment"></span>
                    <textarea
                        name="additionalComments"
                        placeholder="Additional Requirements or Comments"
                        autoComplete="off"
                    ></textarea>
                </div>

                <div className="form-group text-end">
                    <button type="submit" className="theme-btn btn-style-four">
                        <span className="btn-title">Register Now</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;