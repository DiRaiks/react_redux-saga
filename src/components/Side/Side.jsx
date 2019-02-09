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
        { !props.renderList.length && (
            <div>
                <h3>Stations Not Found</h3>
            </div>
        )}
        { !props.fetching && props.renderList.length > 0 && props.renderList }
    </div>
)

Side.propTypes = {
    header: PropTypes.string.isRequired,
    renderList: PropTypes.array.isRequired,
    fetching: PropTypes.bool
}

export default Side