import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/section title/SectionTitle';

const MyClasses = () => {
    return (
        <div className='md:py-20 py-10'>
            <Helmet>
                <title>My Classes | Dashboard | QuillAcademy - Gateway to Learning</title>
            </Helmet>

            <SectionTitle heading={'My Class'}></SectionTitle>
            
        </div>
    );
};

export default MyClasses;