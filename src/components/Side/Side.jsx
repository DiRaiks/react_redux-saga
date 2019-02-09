import React from 'react'
import PropTypes from 'prop-types'

import './side.css'

const Side = (props) => (
    <div className="side">
        <header className="sideHeader">
            { props.header }
        </header>
        { props.companys }
    </div>
)

Side.propTypes = {
    header: PropTypes.string.isRequired,
    companys: PropTypes.array.isRequired,
}

export default Side