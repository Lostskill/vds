import React, {useEffect } from "react";
import VdsServices from "./API/VdsService";
import {Navigate} from 'react-router-dom'

const Logout = () => {   
    useEffect(() => {
        logout();
    }) 
    function logout() {
        VdsServices.logout();
        localStorage.clear();
        <Navigate to='/' />
        document.location.reload();
    };

    return (
        <a>Вы вышли</a>
    )
}
export default Logout;