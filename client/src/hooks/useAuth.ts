import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useAuth = () => {
    const navigate = useNavigate();
    const { toastSuccess } = useToast();

    const {
        setAccessToken,
        setUserId,
        setEmail,
        setIsAuthenticated,
        email,
        userId,
        accessToken,
        userName,
        setUserName

    } = useContext(AuthContext);

    const login = async (accessToken: string) => {
        const userData: any = await jwtDecode(accessToken);
        console.log(userData);
        
        setAccessToken(accessToken);
        localStorage.setItem('Token', accessToken);
        setAccessToken(localStorage.getItem('Token'));
        setUserId(userData.user.id);
        setEmail(userData.user.email);
        setUserName(userData.user.userName);
        setIsAuthenticated(true);
        // console.log(userId, email);
        // console.log(userData)
    }
    // setAccessToken(localAT);

    const localAT = localStorage.getItem('Token');
    const logout = () => {
        if(accessToken === null && localAT === null) return;
        try {
            setAccessToken(null);
            // localStorage.clear();
            localStorage.removeItem("Token");
            setUserId(null);
            setEmail(null);
            setUserName(null);
            setIsAuthenticated(false);
            navigate('/');
            toastSuccess('Logged out!');
        } catch (error) {
            console.log(error);
        } 
    }

    return {
        login,
        email,
        userId,
        logout,
        accessToken,
        userName
    }
}

export default useAuth;