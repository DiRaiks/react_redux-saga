import React from 'react'
import PropTypes from 'prop-types'

import '../../assets/loader.css'

const Loader = (props) => (
    <div className='preloader'>
        <div className={ `loader ${ props.isSmall ? 'smallLoader' : '' }` } />
    </div>
)

Loader.propTypes = {
    isSmall: PropTypes.bool,
}

export default Loader