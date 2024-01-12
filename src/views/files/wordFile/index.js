import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  ListItemText,
  Stack,
  Pagination,
  ListItem,
  Divider,
  TextField,
} from "@mui/material";

import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DoneIcon from "@mui/icons-material/Done";
import { wordList } from "store/action/word.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editList } from "store/action/word.action";

const List = styled(ListItem)({
  justifyContent: "center",
  fontSize: "15px",
});
const Paginate = styled(Pagination)({
  ul: {
    justifyContent: "center",
    marginBottom: "10px",
  },
});

const WordFile = () => {
  const dispatch = useDispatch();
  const WordList = useSelector((state) => state.WordReducer.word);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line 
  const [isShow, setIsShow] = useState(false);
  const [editData, setEditData] = useState();

  useEffect(() => {
    dispatch(wordList(page));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const editItem = (id) => {
    setEditData(id);
  };
  const saveData = async () => {
   await dispatch(editList(editData.globalID, editData.profit));
  };
  

  return (
    <Box>
      <Typography
        variant="h4"
        color="#000000"
        component="div"
        textAlign="center"
      >
        {WordList.lang_caption}
      </Typography>
      <Typography style={{ textAlign: "center",padding:"5px"}}>
        {WordList.lang_extratext}
      </Typography>
      <Divider />
      {WordList.aMyDoc ? (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {WordList.aMyDoc &&
            WordList.aMyDoc.map((item, i) => (
              <Box key={i}>
                <List>
                  <ListItem>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/search/details/${item.globalID}`}
                    >
                      <ListItemText>{item.title}</ListItemText>
                    </Link>
                  </ListItem>

                  <Box
                    sx={{
                      width: 100,
                      textAlign: "center",
                    }}
                  >
                    {editData?.globalID !== item.globalID && (
                      <Typography>{item?.profit}</Typography>
                    )}

                    {isEditing && editData?.globalID === item.globalID && (
                      <div>
                        <TextField
                          focused
                          type="text"
                          value={editData?.profit}
                          onChange={(e) => {
                            setEditData({
                              ...editData,
                              profit: e.target.value,
                            });
                          }}
                        />
                      </div>
                    )}
                  </Box>

                  <div>
                    {isEditing && editData?.globalID === item.globalID ? (
                      <DoneIcon
                        onClick={() => {
                          saveData();
                          setIsShow(false);
                          setEditData();
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <BorderColorTwoToneIcon
                        onClick={() => {
                          editItem(item);

                          setIsEditing(true);
                          setIsShow(true);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </List>
                <Divider />
              </Box>
            ))}
          <Grid>
            {WordList.paginationCount === 1 ? (
              false
            ) : (
              <Stack spacing={2} mt={3}>
                <Paginate
                  count={WordList.paginationCount}
                  color="primary"
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid
          style={{ textAlign: "center", marginTop: "200px", fontSize: "15px" }}
        >
          <Typography> {WordList.lang_empty}</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default WordFile;
