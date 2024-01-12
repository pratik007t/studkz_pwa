import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authRedirectToken } from "store/action/auth.action";

const DirectToken = () => {
  const DirecToken = useParams();
  const navigate = useNavigate();
   const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
     const data =  await dispatch (authRedirectToken(DirecToken.token));
      
     if (data) {
      navigate(`/${data.redirect}`);
    }    
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Or [] if effect doesn't need props or state

};

export default DirectToken;
