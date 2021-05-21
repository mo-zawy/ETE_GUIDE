import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title , description , keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to EE-Guide',
    description:'We descripe Antiquities of Egypt to you',
    keywords:'Egypt, Antiquities, Antiquities of Egypt, Pyramids and Sphinx'
}

export default Meta
