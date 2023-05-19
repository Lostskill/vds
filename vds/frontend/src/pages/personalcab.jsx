import React,{useState,useEffect} from "react";
import VdsServices from "../components/API/VdsService";
import HistoryList from "../components/HistoryList";
const PersonalAreaPage = () => {
    const [history, setHistory] = useState();

    useEffect(() => {
        get_history();
    },[])

    async function get_history() { 
        const token = localStorage.getItem('token');
        const history = await VdsServices.get_order_history({ Authorization: 'Token ' + JSON.parse(token) })

        setHistory(history.data);
    };
    
    return (
       <div> <h1>Кабинет пользователя</h1>
            {history !== undefined
                ? (<div><h2>История покупок</h2> <HistoryList history={history}/></div>)
                :('')
            }
        </div>
    )
}

export default PersonalAreaPage;