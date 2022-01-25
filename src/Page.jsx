import React from 'react';
import PropTypes from 'prop-types';
import MenuPage from './MenuPage/Menu'

const Page = ({
    ContentComponent = null
}) => (
    <MenuPage ContentComponent={ContentComponent && <ContentComponent />} />
);

Page.propTypes = {
    ContentComponent: PropTypes.any,
}

Page.defaultProps = {
    ContentComponent: null,
}

export default Page