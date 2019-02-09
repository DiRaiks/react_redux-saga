import React from 'react'
import PropTypes from 'prop-types'

import './side.css'

import { Loader } from '../../components'

const Side = (props) => (
    <div className="side">
        <header className="sideHeader">
            { props.header }
        </header>
        { props.fetching && <Loader isSmall={ true } /> }
        { !props.fetching && props.renderList }
    </div>
)

Side.propTypes = {
    header: PropTypes.string.isRequired,
    renderList: PropTypes.array.isRequired,
    fetching: PropTypes.bool
}

export default Side