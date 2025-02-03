import React from 'react';
import GalleryPageContent from '../../components/gallery/GalleryPageContent';

const Gallery = () => {
    return (
        <>
            <div className="page-wrapper" style={{
              marginTop:'10vh'
            }}>
                <span className="header-span"></span>
                <GalleryPageContent />
            </div>
        </>
    );
};

export default Gallery;