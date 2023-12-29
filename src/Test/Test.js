import React, { useState } from "react";
import '../Style/style.css'
// import QuadrantGraph from "./Test3";
// import data from "../database.json"

function Test() {
    const [obj, setObj]= useState([]);

    return (
        <div className="container p-5">
            {/* <Test2 /> */}
            {/* <QuadrantGraph /> */}
            {/* <Test4 /> */}
            <input type="text" onChange={(e)=>setObj(JSON.parse(e.target.value))} />
            <div>
                {
                    obj.map((boat, index) =>{
                        return(
                            <div>
                                X axis : {index+1} : 
                                {boat.map((sub, index1) => {
                                    return <span>{sub.ship.type ==='empty' ? null : ` ${index1+1}, `}</span>
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}


export default Test