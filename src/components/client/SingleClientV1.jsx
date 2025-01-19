import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'

const SingleClientV1 = ({ clients }) => {

    return (
        <>
            <div className="sponsors-outer">
                <div className="row">
                    {clients.map(client =>
                        <div className="client-block col-lg-3 col-md-6 col-sm-12" key={client.id}>
                            <figure className="image-box"><Link to={void (0)}>
                            <img 
                            src={`https://mayazin.co/backend/storage/app/public/${client.image}`}
                             alt="image" /></Link></figure>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SingleClientV1;