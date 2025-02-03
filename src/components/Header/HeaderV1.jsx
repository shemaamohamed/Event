import React, { useEffect, useState } from 'react';
import { NavHashLink as Link } from 'react-router-hash-link'
import HeaderTopV1 from './HeaderTopV1';
import HeaderTopV2 from './HeaderTopV2';
import MainMenu from './MainMenu';
import { useAuth } from '../../common/AuthContext';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from "../Notification";
import { Button } from '@mui/material';
import { HomeIcon, LayoutDashboardIcon } from 'lucide-react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



const HeaderV1 = ({ headerStyle, whiteLogo = false, headerTopV1, headerTopV2, parentMenu }) => {
     const { logout, isLoggedIn } = useAuth();
       const navigate = useNavigate();
       const { isAdmin, registrationType} = useAuth();
         const isAttendance = registrationType === "attendance";
         const isSpeaker = registrationType === "speaker";
    const handleHome = (e) => {
        e.preventDefault();
        navigate('/');
    }


    // Sticky Menu 
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

   

    // Mobile Menu 

    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = (event) => {
        event.preventDefault();
        setOpenMenu(!openMenu)
    }

    const handleCloseMenu = () => {
        setOpenMenu(false)
    }

    const toggleMenu = (e) => {
        e.preventDefault();
        const listItem = e.target.parentElement;
        const subMenu = listItem.querySelector('.sub-menu');
        if (subMenu) {
            listItem.classList.toggle('open');
        }
    };

    const toggleMultiMenu = (e) => {
        e.preventDefault();
        const listItem = e.target.parentElement;
        const subMenu = listItem.querySelector('.multi-menu');
        if (subMenu) {
            listItem.classList.toggle('open');
        }
    };

    return (
        <>
            <header className={`main-header ${headerStyle ? headerStyle : ""} ${isSticky ? "fixed-header" : ""}`}>
                {headerTopV1 ?
                    <HeaderTopV1 />
                    : <></>
                }
                {headerTopV2 ?
                    <HeaderTopV2 />
                    : <></>
                }
                <div className="main-box">
                    <div className="auto-container clearfix">
                        <div className="logo-box">
                            {whiteLogo ?
                                <>
                                    <div className="logo"><Link to="/home#"><img src="/images/logo.jpg" alt="image" style={{
                                        width:'130px'
                                    }} /></Link></div>
                                </>
                                : <>
                                    <div className="logo"><Link to="/home#"><img src="/images/logo.jpg" alt="image" style={{
                                        width:'130px'
                                    }}  /></Link></div>
                                </>}
                        </div>
                        <div className="nav-outer clearfix">
                            <div className="mobile-nav-toggler" onClick={handleOpenMenu}><span className="icon flaticon-menu"></span></div>
                            <nav className="main-menu navbar-expand-lg navbar-light">
                                <div className="collapse navbar-collapse clearfix" id="navbarSupportedContent">
                                    <MainMenu parentMenu={parentMenu} />
                                </div>
                            </nav>
                            <div className="outer-box ">
                               


                                {isLoggedIn ? (

                                  <div
                                    div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1px'
                                       
                                    }}
                                  >
                                 
                                  <NotificationDropdown />
                                  {
                                    (isAdmin || isAttendance || isSpeaker) && (
                                        <Button
      sx={{
        backgroundColor: "#9B1321",
        borderRadius: "50%",
        color: "#fff",
        color: "#fff",
    width: "40px", // Adjust size
    height: "40px",
    minWidth: "unset", 
    marginLeft:'20px'
      }}
    onClick={handleHome}
  >
    <LayoutDashboardIcon fontSize="medium" />
  </Button>
                                    )
                                  }



                                  <div className="btn-box" onClick={() => {
                      logout();
                      navigate("/login");
                      handleCloseMenu()
                    }}>
                                <Link  to="/login" className="theme-btn btn-style-one"><span className="btn-title">Logout</span></Link>

                                </div>
                                  </div>
               
              ) : (
                <>
                <div className="btn-box">
                <Link to="/registertype"
                onClick={handleCloseMenu}
                 className="theme-btn btn-style-one"><span className="btn-title">Register</span></Link>


                                </div>
                                
                                 <div className="btn-box">
                                <Link to="/login" 
                                onClick={handleCloseMenu}
                                className="theme-btn btn-style-one"><span className="btn-title">Login</span></Link>

                                </div> 
                </>
              )}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${openMenu ? "mobile-menu-visible" : ""}`}>
                    <div className="mobile-menu">
                        <div className="menu-backdrop" ></div>
                        <div className="close-btn"><span className="icon flaticon-cancel-1"></span></div>
                        <nav className="menu-box">
                            <div className="nav-logo"><Link to="/home#"><img src="/images/logo.jpg" alt="image" /></Link></div>
                            <MainMenu toggleMultiMenu={toggleMultiMenu} toggleMenu={toggleMenu} parentMenu={parentMenu}       handleCloseMenu={handleCloseMenu}  />
                            {isLoggedIn ? (
                                  <div
                                    style={{
                                        marginTop:'3vh',
                    justifyContent:'space-evenly',
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row'
                                    }}

                                  >
                                 



                                  <div className="btn-box" onClick={() => {
                      logout();
                      navigate("/login");
                      handleCloseMenu()

                    }}>
                                <Link  to="/login" className="theme-btn btn-style-one"><span className="btn-title">Logout</span></Link>

                                </div>
                             
                                {
                                    (isAdmin || isAttendance || isSpeaker) && (
                                        <Button
      sx={{
        backgroundColor: "#9B1321",
        borderRadius: "50%",
        color: "#fff",
        color: "#fff",
    width: "40px", // Adjust size
    height: "40px",
    minWidth: "unset", 
      }}
    onClick={handleHome}
  >
    <LayoutDashboardIcon fontSize="medium" />
  </Button>
                                    )
                                  }
                                <NotificationDropdown />

                                  </div>
               
              ) : (
                <>
                <div className="btn-box" style={{
                    marginTop:'3vh',
                    justifyContent:'center',
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row'
                }}>
                <Link 
                onClick={handleCloseMenu}
                 style={{
                    marginRight:'2px'
                }}to="/registertype" className="theme-btn btn-style-one"><span className="btn-title">Register</span></Link>
                <Link to="/login" 
                onClick={handleCloseMenu}
                className="theme-btn btn-style-one"><span className="btn-title">Login</span></Link>



                                </div>
                                
                                 
                </>
              )}
                        </nav>
                        <div className="close-btn" onClick={handleCloseMenu} ><span className="icon flaticon-cancel-music"></span></div>
                    </div>
                </div>
            </header>
         

        </>
    );
};

export default HeaderV1;