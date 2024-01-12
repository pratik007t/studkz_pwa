import React from 'react'
import Loading from 'react-fullscreen-loading';


export default function HoverLoader() {
    return (
        <React.Fragment>
            <Loading loading background="transparent" loaderColor="#000" />
        </React.Fragment>
    )
}
