import { useSelector } from "react-redux";
import Constraints from "../../constraints/constraints";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfile } from "../../features/auth/authSlice";

const IsAuth = () => {
  const constraints = new Constraints();
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.accessToken);
  const refreshToken = useSelector((state: any) => state.refreshToken);
  const dispatch = useDispatch();
  const GetProfileFromToken = async (token: any) => {
    const result = await axios.get(
      `${constraints.api_server}/api/user/personalProfileByToken`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(result.data)
    return result.data;
  }
  useEffect(() => {
    const authCheck = async () => {
      const isAuthenticated = !!accessToken;
      if (isAuthenticated === false) {
        return navigate("/Sign");
      } else {
        if (refreshToken ===null) {
          const resultGetFromAccessToken = await GetProfileFromToken(
            accessToken
          );
          dispatch(setProfile(resultGetFromAccessToken.data));
        } else {
          const resultGetFromRefreshToken = await GetProfileFromToken(
            refreshToken
          );
          dispatch(setProfile(resultGetFromRefreshToken.data));
        }
      }
    };
    authCheck();
  }, [accessToken, refreshToken]);
  return <></>;
}
export default IsAuth;
