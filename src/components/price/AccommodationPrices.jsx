import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'
const AccommodationPrices = ({ roomPrices }) => {

    return (
        <section className={`pricing-section-two ${"alternate"}`}>
            <div className="sec-title  text-center">
                <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>            Accommodation Prices</h2>
            </div>
            <div className="anim-icons">
                <span className="icon icon-line-1"></span>
                <span className="icon icon-circle-1"></span>
                <span className="icon icon-dots"></span>
            </div>
            <div className="auto-container">
                
                <div className="outer-box">
                    <div className="row"
                    
                    >
                        <div className="pricing-block-two  col-sm-12">
                            <div className="inner-box">
                                <div className="price-box">
                                    <h4 className="price">{roomPrices?.hotel_name}</h4>
                                </div>
                                {!localStorage.getItem("token") && (
                                    <div className="btn-box">
                                        <Link to="/registertype" className="theme-btn btn-style-one">
                                            <span className="btn-title">Register</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>


                    
                    <div className="pricing-block-two col-md-6 col-sm-12" >
                        <div className="inner-box">
                            <div className="price-box">
                                <h4 className="price">${roomPrices?.single_base_price}</h4>
                            </div>
                            <div className="title">Single Room</div>

                            {!localStorage.getItem("token") && (
                                <div className="btn-box">
                                    <Link to="/registertype" className="theme-btn btn-style-one"><span className="btn-title">Register</span></Link>
                                </div>

                            )}


                        </div>

                    </div>
                    <div className="pricing-block-two col-md-6 col-sm-12" >
                        <div className="inner-box">
                            <div className="price-box">
                                <h4 className="price">${roomPrices?.double_base_price}</h4>
                            </div>
                            <div className="title">Double Room</div>

                            {!localStorage.getItem("token") && (
                                <div className="btn-box">
                                    <Link to="/registertype" className="theme-btn btn-style-one"><span className="btn-title">Register</span></Link>
                                </div>

                            )}


                        </div>

                    </div>
                    <div className="pricing-block-two col-md-6 col-sm-12" >
                        <div className="inner-box">
                            <div className="price-box">
                                <h4 className="price">${roomPrices?.triple_base_price}</h4>
                            </div>
                            <div className="title">Triple Room</div>

                            {!localStorage.getItem("token") && (
                                <div className="btn-box">
                                    <Link to="/registertype" className="theme-btn btn-style-one"><span className="btn-title">Register</span></Link>
                                </div>

                            )}


                        </div>

                    </div>
                </div>
            </div>
        </div>
      </section >
  )
}

export default AccommodationPrices
