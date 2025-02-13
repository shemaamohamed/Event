import React, { useEffect, useState } from 'react';
import SingleClientV1 from './SingleClientV1';
import axios from 'axios';

const ClientV1 = () => {
    const [clients, setClients] = useState([]); 
    const BaseUrl = process.env.REACT_APP_BASE_URL;
  
    useEffect(() => {
      const fetchClients = () => {
        axios.get(`${BaseUrl}/clients`)
          .then(response => {
            console.log(response.data);
            setClients(response.data); 
          })
          .catch(error => {
            console.error('Error fetching clients:', error.response ? error.response.data : error.message);
          });
      };
  
      fetchClients(); 
    }, []); 
    return (
        <>
            <section className="clients-section" style={{
              marginTop:'10vh'
            }}>
                <div className="anim-icons">
                        <span className="icon icon-dots-3"></span>
                    <span className="icon icon-circle-blue"></span>
                </div>
                <div className="auto-container">
                    <div className="sec-title">
                        <span className="title">Clients</span>
                    </div>
                    <SingleClientV1  clients={clients} />
                </div>
            </section>
        </>
    );
};

export default ClientV1;