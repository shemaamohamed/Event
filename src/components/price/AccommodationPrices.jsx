import React from 'react';
import { HashLink as Link } from 'react-router-hash-link'
const AccommodationPrices = ({ roomPrices }) => {

    return (
        <section className={`pricing-section-two ${"alternate"}`}>
            <div className="sec-title  text-center">
                <h2 style={{ display: 'inline-block', borderBottom: '2px solid #9B1321', paddingBottom: '10px' }}>            Accommodation Prices</h2>
            </div>
            
            <div className="auto-container">
                
                <div className="outer-box">
                    <div className="row"
                    
                    >
                        <div className="pricing-block-two  col-sm-12">
                            <div className="inner-box">
                                <div className="price-box">
                                    <h4 
                                    style={{
                                        borderRadius:'20px',
                                        backgroundColor: '#222',
                                        color:'white',
                                        padding:'5px 50px',
                                        position: 'relative',  

                                    }}
                                    >{roomPrices?.hotel_name}</h4>
                                </div>
                                <div
                                style={{
                                    width:'100%',
                                    height:"10px",
                                    color:"black",
                                    backgroundColor:'black',
                                }}
                                >

                                </div>
                                {!localStorage.getItem("token") && (
                                    <div className="btn-box"
                                    style={{
                                        marginTop:'2vh'
                                    }}
                                    >
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
                                <h4 className="price1">${roomPrices?.single_base_price}</h4>
                            </div>
                            <div className="title1">Single Room</div>

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
                                <h4 className="price1">${roomPrices?.double_base_price}</h4>
                            </div>
                            <div className="title1">Double Room</div>

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
                                <h4 className="price1">${roomPrices?.triple_base_price}</h4>
                            </div>
                            <div className="title1">Triple Room</div>

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
