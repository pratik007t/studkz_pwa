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
import { searchAction } from "./../../store/action/search.action";
import { useNavigate, useParams } from "react-router-dom";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
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
const FilterModal = (props) => {
  const language = localStorage.getItem("language");
  const navigate = useNavigate();
  const filterText = useParams()
  const search = filterText.text
  const Filter = useSelector((state) => state.SearchReducer.filter.filters);
  // const search = useSelector((state) => state.SearchReducer.search);
  const searchFilterData = useSelector(
    (state) => state.SearchReducer.selectedFilterItems
  );

  const [openModal, setModal] = useState();
  const dispatch = useDispatch();

  const iconTypeMap = {
    Hi: require('react-icons/hi'),
    Bi: require('react-icons/bi'),
  };

  const handleFilterItem = async (item) => {
    setModal(props.onButton);
    dispatch({
      type: "SELECTED_FILTER_ITEM",
      payload: [item],
    });
    dispatch({
      type: "SELECTED_SPARK_FILTER_ITEM",
      payload: [],
    });
 const data =  await dispatch(searchAction(search, item?.filter));
 if(data){
  navigate(`/search/${language}/${item?.filter}/${search}`);
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
                        <ListItem>{item.title}</ListItem>
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
                        <ListItem>{item.title}</ListItem>
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
                        <ListItem>{item.title}</ListItem>
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

export default FilterModal;
