import React from 'react'
import loading from '../../assets/images/Loading/loading.svg'

export default function Loader(props) {
    return props.loader  && (
        <div style={{textAlign:'center'}}>
            <img src={loading} alt="loader"  />
        </div>
    )
}
