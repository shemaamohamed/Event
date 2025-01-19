import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { HashLink as Link } from 'react-router-hash-link'

const VideoV1 = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <section className="video-section" style={{ backgroundImage: "url(images/background/1.jpg)" }}>
                <div className="auto-container">
                    <div className="content-box">
                        <div className="text">WE’RE A LEADING INDUSTRY COMPANY</div>
                        <h2>With our expertise and commitment to excellence, <br /> we transform your ideas into memorable and impactful events.</h2>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="Fvae8nxzVz4" onClose={() => setOpen(false)} />
                        <Link className="play-now" onClick={() => setOpen(true)}>
                            <i className="icon flaticon-play-button-3" aria-hidden="true"></i>
                            <span className="ripple"></span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VideoV1;