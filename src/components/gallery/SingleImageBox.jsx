import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'react-photoswipe-gallery';

const SingleImageBox = ({ gallery }) => {
    const backendUrlImages = "https://mayazin.co/backend/storage/app/public/"


    return (
        <>
            <div className="image-box">
                <figure className="image"><img 
                                src={`${backendUrlImages}/${gallery.image}`} 
                                alt="image" /></figure>
                <div className="overlay-box">
                    <Link className="lightbox-image">
                        <Item
                            original={`${backendUrlImages}/${gallery.image}`}
                            thumbnail={`${backendUrlImages}/${gallery.image}`}
                            width="370"
                            height="370"
                        >
                            {({ ref, open }) => (
                                <span ref={ref} onClick={open} className="icon fa fa-expand-arrows-alt" />
                            )}
                        </Item>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleImageBox;