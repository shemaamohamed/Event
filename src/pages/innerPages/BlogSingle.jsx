import React from 'react';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import BlogSingleContent from '../../components/blog/BlogSingleContent';
import { useParams } from 'react-router-dom';
import BlogContentV1Data from '../../jsonData/blog/BlogContentV1Data.json'

const BlogSingle = () => {

    const { id } = useParams()
    const data = BlogContentV1Data.filter(speaker => speaker.id === parseInt(id))[0]

    return (
        <>
            <div className="page-wrapper">
                <span className="header-span"></span>
                <BreadCrumb title="Blog Single" breadCrumb="blog-single" />
                <BlogSingleContent blogInfo={data} />
            </div>
        </>
    );
};

export default BlogSingle;