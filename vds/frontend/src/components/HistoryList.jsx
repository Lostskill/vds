import React from "react";
import HistoryItems from "./HistoryItems";
const HistoryList = ({history}) => {
    return(               
    <div> {history.map((history) =>
        <HistoryItems item={history} />
     )}</div>)
};

export default HistoryList;