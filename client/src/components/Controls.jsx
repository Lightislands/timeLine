import React, { useState, useEffect } from "react";
import paramsAPI from '../services/paramsAPI';

const Controls = () => {
  const [settings, setSettings] = useState(null);

  const getSettings = async () => {
    let res = await paramsAPI.getParams();
    console.log("---RES--0-", res);
    
    if (res instanceof Array && !res.length) {
      console.log("---No Settings in DB -", !res.length);

      /* TODO: add server endpoint with logout function */
      window.location.replace('http://localhost:8080');
    };

    setSettings(res);
  }


  useEffect(() => {
    if(!settings) {
      getSettings();
    }
  })


  console.log("----11---settings.params", settings?.params?.isFanOn)

  return (
    <div className="list__item product">
      <h3 className="product__name">{settings?.userName}</h3>
      <p className="product__description">is fan on: {settings?.params?.isFanOn ? 'Yes' : 'No'}</p>
      <p className="product__description">is window oppened: {settings?.params?.isWindowOpen ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Controls;
