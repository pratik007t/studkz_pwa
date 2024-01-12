import { Link, useNavigate } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import config from "config";
import { Box } from "@mui/system";

// ==============================|| MAIN LOGO ||============================== //
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getBotSystem } from "store/action/search.action";
import { toast } from "react-toastify";


const LogoSection = () => {
  const userData = useSelector((state) => state.auth);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleAva = async () =>{
    const data = await dispatch(getBotSystem());
    if(data){
      navigate(`/chat/conversation/${data.receiverID}`);
    }
    else{
      toast.error("Message ID Not found")
    }
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <ButtonBase disableRipple 
      to={config.defaultPath}>
        <Box marginTop={2}>
          <Avatar
            style={{ width: "56px", height: "56px" }}
            alt="Remy Sharp"
            src={userData?.avaUrl}
            onClick={handleAva}
          />

          <div style={{ margin: "5px" }}>
            <h4 onClick={handleAva}>ID: {userId}</h4>
          </div>
        </Box>
      </ButtonBase>
    </Box>
  );
};

export default LogoSection;
