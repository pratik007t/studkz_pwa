import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Grid,
  Typography,
  Toolbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NoteList, getByIdNotes } from "store/action/note.action";

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.NoteReducer.list);
  const allList = data?.aNotes;
  const [isLoading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState([]);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    dispatch(NoteList(page));
    setLoading(false);
    // eslint-disable-next-line
  }, [page]);

  const anc = (e) => {
    const { value, checked } = e.target;
    let arr = [];
    if (checked) {
      arr = [...isChecked, value];
      setIsChecked(arr);
    } else {
      arr = isChecked.filter((e) => e !== value);
      setIsChecked(arr);
    }
    return arr;
  };
  const handleChange = async (e) => {
    const data = anc(e);

    dispatch({
      type: "DELETE_NOTE_ID",
      payload: data,
    });
  };

  //===========================================
  const getNoteById = async (id) => {
    const res = await dispatch(getByIdNotes(id));
    if (res) {
      navigate(`/notes/${id}`);
    }
  };

  return (
    <Box>
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="h4" color="#000000" component="div">
          {data?.lang_caption}
        </Typography>
      </Toolbar>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress sx={{ color: "olivedrab" }} />
        </Backdrop>
      ) : (
        <Grid>
          {allList ? (
            <Grid>
              {allList &&
                allList.map((item) => (
                  <div key={item.noteID}>
                    <Divider />
                    <Typography
                      style={{ margin: "12px 12px 12px 12px",cursor:"pointer" }}
                      onClick={() => {
                        getNoteById(item.globalID);
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Grid style={{ textAlign: "end" }}>
                      <input
                        style={{cursor:"pointer"}}
                        type="checkbox"
                        value={item.noteID}
                        checked={item.isChecked}
                        size="small"
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                  </div>
                ))}
            </Grid>
          ) : (
            <Grid
              style={{
                textAlign: "center",
                marginTop: "250px",
                fontSize: "15px",
              }}
            >
              <Typography> {data?.lang_empty}</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};
export default Notes;
