import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import BlogGridContent from '../../components/blog/BlogGridContent';

const BlogGrid = () => {
    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Blog Grid" breadCrumb="blog-grid" />
                <BlogGridContent />
            </div>
        </>
    );
};

export default BlogGrid;