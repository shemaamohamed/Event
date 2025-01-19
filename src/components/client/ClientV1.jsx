import React, { useEffect, useState } from 'react';
import SingleClientV1 from './SingleClientV1';
import axios from 'axios';

const ClientV1 = () => {
    const [clients, setClients] = useState([]); 
    const BaseUrl = "https://panel.mayazin.co/api";
  
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
            <section className="clients-section">
                <div className="anim-icons">
                        <span className="icon icon-dots-3"></span>
                    <span className="icon icon-circle-blue"></span>
                </div>
                <div className="auto-container">
                    <div className="sec-title">
                        <span className="title">Clients</span>
                        <h2>Our Clients</h2>
                    </div>
                    <SingleClientV1  clients={clients} />
                </div>
            </section>
        </>
    );
};

export default ClientV1;