import React from 'react'
import styled from '@emotion/styled'
import GoogleMapReact from 'google-map-react';



const Wrapper = styled.div`
    position: relative;
    content:"hi thise is akaash";
    width: 38px;
    height: 37px;
    background-image: url(https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg);
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    cursor: grab;
`;

 function  MarkerWrapper({text , onClick , name , image , address}) {
 

  return (

    <Wrapper
      alt={text}
      onClick={onClick}

    >
      <div className='bg-white text-dark' style={{ position: "absolute", top: "50px", left: "-150px", width: "300px" }} >
        <div className="card   ">

          <div className="row ">
            <div className="col-md-6"  >
              <img src={image} className="img-fluid" alt="Avatar" style={{width:"100px", height:"100px"}} />
            </div>
            <div className="col-md-6">
              <div className="text-start pl-2 pt-2">
                <h5> {name}</h5>
                <p >{address}</p>

              </div>
            </div>
          </div>


        </div>
      </div>
    </Wrapper>

  )
}


 const Marker  = (props)=> {
  
  return (
    <div>
      <div style={{ height: '100vh', width: '100%' }}>
                                            <GoogleMapReact
                                                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API}}
                                                defaultCenter={{ lat:parseFloat(props.lat),
                                                lng:parseFloat(props.long)
                                                }}  defaultZoom={11}
                                                

                                            >
                                                <MarkerWrapper
                                                  name ={props.name }
                                                  image ={props.image}
                                                  address={props.address}
                                                  lat={parseFloat(props.lat)}
                                                lng={parseFloat(props.long)}
                                                    text="My Marker"
                                                />
                                            </GoogleMapReact>
   </div>
    </div>
  )
}

export default Marker;
