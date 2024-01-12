import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPdfData } from "store/action/search.action";
import { Typography } from "@mui/material";
import { isBrowser } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Zoom } from "swiper";
import MainLayout from "layout/MainLayout";

const File = () => {
  const [zoom, setZoom] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [selectedImage, setSelectedImage] = useState(null);  

  const { id } = useParams();
  const dispatch = useDispatch();

  const pdf = useSelector((state) => state.SearchReducer.pdf);

  useEffect(() => {
    dispatch(getPdfData(id));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
//=====================Remove Scroller=========================
const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

useEffect(() => {
  const handleOrientationChange = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  window.addEventListener('resize', handleOrientationChange);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleOrientationChange);
  };
}, []);
//=====================Remove Scroller=========================
  const handleImage = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setZoom(true);
  };

  const handleClose = () => {
    setZoom(false);
  };

  const handleImageClick = (image, event) => {
    // setSelectedImage(image);
    event.stopPropagation();
  };

  return (
    
    <Grid container style={{height:"100%"}}>
      <div style={{ right: 20, top: 5, position: "fixed", zIndex: 2 }}>
        {zoom && (
          <MainLayout
          handleCloseEvent={handleClose}
          />
        )}
      </div>

       <Grid container>
      {!zoom &&
        pdf.map((item, i) => (
          <Grid item xs={6} key={i}>
            <Typography>
              <img
                alt="file"
                src={item.src}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                onClick={() => handleImage(i)}
              />
            </Typography>
          </Grid>
        ))}
        </Grid>

        {isBrowser && zoom && (
            <Grid sx={{textAlign:"center",width:"100%"}}>
              <Swiper
                initialSlide={currentIndex}
                zoom={true}
                modules={[Zoom]}
                className="mySwiper"
              >
                {pdf.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="swiper-zoom-container">
                      <img
                        src={item.src}
                        alt="file"
                       
                        onClick={(event) => handleImageClick(item, event)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
      
        )}
      
        {!isBrowser && zoom && (
          <Grid container style={{height:"100%"}}>
          <Swiper
            style={{
              overflow: "hidden",
              touchAction: isPortrait ? "none" : "pan-y",
            
            }}
            // onTouchStart={(e) => e.stopPropagation()}
            initialSlide={currentIndex}
            zoom={true}
            modules={[Zoom]}
            className="mySwiper"
            touchEventsTarget="container"
          >
            {pdf.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-zoom-container">
                  <img
                    src={item.src}
                    alt="img"
                    style={{
                      width: "100%",
                      marginTop: "60px",
                    }}
                    onClick={(event) => handleImageClick(item, event)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </Grid>
        )} 
    </Grid>
  );
};

export default File;
