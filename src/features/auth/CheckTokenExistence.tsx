import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckTokenExistence() {
  const navigate = useNavigate()
  const accessToken = useSelector((state:any) => state.auth.accessToken);
    useEffect(()=>{
        const isAuthenticated = !!accessToken;
        if(isAuthenticated===false){
            return navigate("/Sign")
        }
    },[accessToken])
  return <>
  </>;
}
export default CheckTokenExistence;
