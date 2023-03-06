import React, { useState, useEffect } from "react";
import paramsAPI from '../services/paramsAPI';

const Sensors = () => {
  const [sensorsData, setSensorsData] = useState(null);

  // const getSensorData = async () => {
  //   let res = await paramsAPI.getSensorsData();
  //   console.log("---Sensors-", res);
    
  //   // TODO: move logic out from request
  //   // if (res instanceof Array && !res.length) {
  //   //   console.log("---RES_SENSORS-", res);
  //   // };

  //   setSensorsData(res);
  // }


  const getSensorData = async () => {
    const response = await paramsAPI.getSensorsData();
    if (response instanceof Array && !response.length) {
      console.log("---ERROR--NO data", response);
      return;
    };

    setSensorsData(response);

    // do it again in 10 seconds
    setTimeout(getSensorData , 10000);
};


  useEffect(() => {
    getSensorData();
  }, []);

  console.log("----Sensors", sensorsData)

  return (
    <div  className="sensors">
     Sensors
    </div>
  );
};

export default Sensors;
