import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const SocialShare = () => {
    return (
        <>
            <li>
                <Link to="https://www.facebook.com/eventscons/" target='_blank'><i className="fab fa-facebook-f"></i></Link>
            </li>
            <li>
                <Link to="https://api.whatsapp.com/send?phone=%2B962799602002" target='_blank'><i className="fab fa-whatsapp"></i></Link>
            </li>
            <li>
                <Link to="https://www.youtube.com/channel/UC6wJycA901VnU6chdmqP58Q" target='_blank'><i className="fab fa-youtube"></i></Link>
            </li>
            <li>
                <Link to="https://www.linkedin.com/company/events-consultant/" target='_blank'><i className="fab fa-linkedin"></i></Link>
            </li>
        </>
    );
};

export default SocialShare;