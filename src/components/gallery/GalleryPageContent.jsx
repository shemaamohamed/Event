import React, { useEffect, useState } from 'react';
import { Gallery } from 'react-photoswipe-gallery';
import Pagination from 'react-paginate';
import axios from 'axios';
import { backendUrlImages } from '../../constant/config';
import { useNavigate } from 'react-router-dom';

const GalleryPageContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(""); 

    const BaseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const fetchAlbums = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BaseUrl}/all/album`);
            setAlbums(Array.isArray(response.data.data) ? response.data.data : []);
            setCurrentPage(page);
        } catch (error) {
            console.error("Error fetching albums:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums(currentPage);
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    };

    const totalPages = Math.ceil(albums?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedAlbums = albums.slice(startIndex, startIndex + itemsPerPage);

    const deleteAlbum = async (albumId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this album?");
            if (confirmDelete) {
                await axios.delete(`${BaseUrl}/delete/album/${albumId}`);
                // إعادة تحميل الألبومات بعد الحذف
                fetchAlbums(currentPage);
            }
        } catch (error) {
            console.error("Error deleting album:", error);
        }
    };
    const fetchUserData = async () => {

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${BaseUrl}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserData(response?.data?.user.isAdmin);
                console.log(response?.data?.user.isAdmin);
                
            } 
        } catch (error) {
            console.error("Error fetching user data:", error);
         
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <section className="gallery-section">
            <div className="auto-container">
                <div className="sec-title text-center">
                    <span className="title">Gallery</span>
                    <h2>Event Gallery</h2>
                </div>
                <div className="row">
                    <Gallery withDownloadButton>
                        {displayedAlbums.map(album => (
                            <div className="gallery-item col-lg-4 col-md-6 col-sm-12 text-center" key={album.id}>
                                <img 
                                    src={`${backendUrlImages}/${album.cover_image}`} 
                                    alt={album.name} 
                                    
                                    style={{ borderRadius: '10px', marginBottom: '10px',
                                        width:'350px',
                                        height:'300px'
                                     }} 
                                />
                                <div className=" mt-2" style={{
                                    gap:5,
                                    flexDirection:'column',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }} >
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/album/${album.id}`)}
                                        style={{
                                            backgroundColor:"#9B1321",
                                            border:"#9B1321",
                                            width:'150px'
                                        }}
                                    >
                                        View Album
                                    </button>
                              {userData &&      <button 
                                        className="btn btn-danger "
                                        onClick={() => deleteAlbum(album.id)}
                                        style={{
                                            width:'150px',

                                            backgroundColor:"#9B1321"
                                        }}
                                    >
                                        Delete Album
                                    </button>}
                                </div>
                            </div>
                        ))}
                    </Gallery>
                    <Pagination
                        previousLabel={currentPage === 1 ? <i className='icon fa fa-ban'></i> : <i className='icon fa fa-angle-left'></i>}
                        nextLabel={currentPage === totalPages ? <i className='icon fa fa-ban'></i> : <i className='icon fa fa-angle-right'></i>}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'styled-pagination text-center'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </section>
    );
};

export default GalleryPageContent;
