import react,{useEffect, useState} from 'react'
import axios from "axios";
import Constraints from "../../constraints/constraints";
import { useSelector} from 'react-redux';
import { useNavigate}  from 'react-router-dom';
import CheckTokenExistence from '../../features/auth/CheckTokenExistence';
function MainPage(){
    const [profile,setProfile]=useState()
    const constants= new Constraints()
    const accessToken = useSelector((state:any) => state.auth.accessToken);
    async function getUserprofile(){
        const result = await axios.get(`${constants.api_server}/api/user/personProfile`,{
            headers: {
                'Authorization': `${accessToken}` 
              }
        });
        setProfile(result.data)
        return result.data
    }
    console.log(profile)
    return(
        <>
        <CheckTokenExistence/>
        </>
    )
}
export default MainPage