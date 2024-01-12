import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Grid,
  ListItemButton,
  ListItem,
} from "@mui/material";
import { useSelector } from "react-redux";

import { searchAction } from "../../store/action/search.action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IconContext } from 'react-icons';

const IconRenderer = ({ iconType, iconName }) => {
  const IconComponent = iconType[iconName]; // Get the icon component dynamically

  if (!IconComponent) {
    return null; // If the icon component doesn't exist, return null or show a placeholder
  }

  return (
    <IconContext.Provider value={{ size: '2em' }}>
      <IconComponent />
    </IconContext.Provider>
  );
};


const SparkFilterModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const language = localStorage.getItem("language");
  const Filter = useSelector((state) => state.SearchReducer.sparkFilter);
  const MainChainData = useSelector(
    (state) => state.SearchReducer.commonMainChain
  );

  const searchFilterData = useSelector(
    (state) => state.SearchReducer.selectedSparkFilterItems
  );

  const [openModal, setModal] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const iconTypeMap = {
    Ai: require('react-icons/ai'),
    Bi: require('react-icons/bi'),
  };

  const handleFilterItem = async (item) => {
    
    setModal(props.onButton);
    dispatch({
      type: "SELECTED_SPARK_FILTER_ITEM",
      payload: item,
    });
 
    if (item?.type === "filter") {
      setIsLoading(true);
      const data = await dispatch(searchAction(item?.data?.split(":")[2], item?.data?.split(":")[1].split("#")[0]));
      if (data) {
        navigate(`/search/${language}/${item?.data?.split(":")[1].split("#")[0]}/${item?.data?.split(":")[2]}`);
      }
      setIsLoading(false);
    } 
    else if (item?.type === "GID") {
      // const response = await dispatch(
      //   getData(item?.data?.split(":")[1]),
      //   MainChainData
      // );
      // if (response) {
        navigate(`/search/details/${item?.data?.split(":")[1]}`);
      // }
    } 
    else if (item?.type === "chat") {
      navigate(`/chat/conversation/${item?.data?.split(":")[1]}`);
    }
    else {
      toast.error("The Filter Type is Missing");
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        // TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              borderRadius: "0",
            },
          },
        }}
      >
        <DialogContent>
          <>
            {language === "kz" ? (
              <DialogActions>
                <Grid item>
                  {Filter &&
                    Filter.map((item, i) => (
                      <Box key={i}>
                        <ListItemButton
                          onClick={() => {                          
                            handleFilterItem(item);                           
                          }}
                          style={{
                            fontWeight: "bold",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                            color:
                              searchFilterData?.[0]?.filter === item.filter &&
                              "#7dbf41",
                          }}
                        >
                        <IconRenderer iconType={iconTypeMap[item.react_icon.substring(0,2)]} iconName={item.react_icon} />
                          <ListItem>{item.name}</ListItem>
                        </ListItemButton>
                      </Box>
                    ))}
                </Grid>
              </DialogActions>
            ) : (
              language === "kz"
            )}

            {language === "ru" ? (
              <DialogActions>
                <Grid item>
                  {Filter &&
                    Filter.map((item, i) => (
                      <Box key={i}>
                        <ListItemButton
                          style={{
                            fontWeight: "bold",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                            color:
                              searchFilterData?.[0]?.filter === item.filter &&
                              "#7dbf41",
                          }}
                          onClick={() => {
                            handleFilterItem(item);
                          }}
                        >
                        <IconRenderer iconType={iconTypeMap[item.react_icon.substring(0,2)]} iconName={item.react_icon} />
                          <ListItem>{item.name}</ListItem>
                        </ListItemButton>
                      </Box>
                    ))}
                </Grid>
              </DialogActions>
            ) : (
              language === "kz"
            )}
            {language === "en" ? (
              <DialogActions>
                <Grid item>
                  {Filter &&
                    Filter.map((item, i) => (
                      <Box key={i}>
                        <ListItemButton
                          style={{
                            fontWeight: "bold",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                            color:
                              searchFilterData?.[0]?.filter === item.filter &&
                              "#7dbf41",
                          }}
                          onClick={() => {
                            handleFilterItem(item);
                          }}
                        >                
                          <IconRenderer iconType={iconTypeMap[item.react_icon.substring(0,2)]} iconName={item.react_icon} />
                          <ListItem>{item.name}</ListItem>
                        </ListItemButton>
                      </Box>
                    ))}
                </Grid>
              </DialogActions>
            ) : (
              language === "kz"
            )}
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SparkFilterModal;
