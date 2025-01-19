import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import BlogPageContent from '../../components/blog/BlogPageContent';
import { useParams } from 'react-router-dom';
import LatestPostV1 from '../../jsonData/blog/LatestPostV1.json'

const BlogSidebar = () => {

    const { id } = useParams()
    const data = LatestPostV1.filter(speaker => speaker.id === parseInt(id))[0]

    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Blog Sidebar" breadCrumb="blog-sidebar" />
                <BlogPageContent sidebarInfo={data} />
            </div>
        </>
    );
};

export default BlogSidebar;