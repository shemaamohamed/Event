import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './style.scss'; // استيراد الملف الخاص بالـ CSS

const AddZoomLink = () => {
  const { conferenceId } = useParams();
  const [onlineUser, setOnlineUser] = useState([]);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);
  const [zoomLink, setZoomLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id ,setId] =useState(0)









const BaseUrl = process.env.REACT_APP_BASE_URL;

  // console.log(token);
  const getOnlineParticipant = () => {
    const token = localStorage.getItem('token'); // استخراج التوكن من الـ localStorage


    axios.get(`${BaseUrl}/conference/${conferenceId}/online-speakers`, {
      headers: {
        Authorization: `Bearer ${token}` // إضافة التوكن في هيدر الطلب
      }
    })
    .then(response => {
      console.log('Online participants:', response.data.data);
      setOnlineUser(response.data.data); // تعيين البيانات المسترجعة
    })
    .catch(error => {
      console.error('Error fetching online participants:', error);
    });
  }

  const handleAddLink = (speakerId) => {
    setSelectedSpeakerId(speakerId); // تحديد السبيكر الذي سيتم إضافة الرابط له
    setIsModalOpen(true); // فتح نافذة الإدخال
  };

  const handleSubmitLink = (Id) => {
    const token = localStorage.getItem('token');

    console.log(  { link: zoomLink,speaker_id:Id },);

    axios.post(`${BaseUrl}/speakers/link`, 
      { link: zoomLink,speaker_id:Id },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    .then(response => {
      console.log('Link added successfully:', response.data);
      setIsModalOpen(false);
      setZoomLink(""); // مسح القيمة بعد الإضافة
      getOnlineParticipant(); // تحديث قائمة المشاركين
    })
    .catch(error => {
      console.error('Error adding link:', error);
    });
  };

  useEffect(() => {
    getOnlineParticipant()
  }, []);

  return (
    <div className="container">
      <h2>Online Participants</h2>
      {onlineUser.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {onlineUser.map((speaker) => (
              <tr key={speaker.id}>
                <td>{speaker.user.name}</td>
                <td>{speaker.user.email}</td>
                <td>{speaker.user.specialization}</td>
                <td>{speaker.is_online_approved ? "Approved" : "Pending"}</td>
                <td><a href={speaker.link} target="_blank" rel="noopener noreferrer">Join</a></td>
                <td>
                  <button 
                    className="btn-add-link" 
                    onClick={() =>{ handleAddLink(speaker.id)

                      setId(speaker.id)
                    }
                  
                  }
                   
                  >
                    Add Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No online participants found.</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Zoom Link</h3>
            <input
              type="url"
              placeholder="Enter Zoom link"
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={()=>handleSubmitLink(id)}>Submit</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddZoomLink;
