import React from 'react';
import { Item } from 'react-photoswipe-gallery';
import { Link } from 'react-router-dom';

const SingleGalleryV1 = ({ album }) => {
    const backendUrlImages = "https://mayazin.co/backend/storage/app/public/"

    return (
        <>
            <div className="insta-feeds">
                <figure className="image mb-0"> <img src={`${backendUrlImages}/${album.image}`} alt="image" /> </figure>
                <div className="overlay-box">
                    <Link className='insta-image'>
                        <Item
                             original={`${backendUrlImages}/${album.image}`}
                             thumbnail={`${backendUrlImages}/${album.image}`}
                            width="370"
                            height="370"
                        >
                            {({ ref, open }) => (
                                <span ref={ref} onClick={open} className='fas fa-link' />
                            )}
                        </Item>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleGalleryV1;