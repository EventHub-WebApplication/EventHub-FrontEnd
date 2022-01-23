import React from "react";
import ReactLoading from "react-loading";

const Loader = () => (
    <div>
        <ReactLoading type="spin" color="black" style={{ width: "5%", marginTop: "5%", marginLeft: "auto", marginRight: "auto"}}/>
        <p></p>
        <p style={{textAlign: "center"}}>กำลังโหลด</p>
    </div>
);
export default Loader;