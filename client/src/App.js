import React, { useState, useEffect } from "react";
import './scss/style.scss';
import Controls from './components/Controls.jsx';
import Sensors from './components/Sensors.jsx';
// import axios from 'axios';

// SERVICES
import paramsAPI from './services/paramsAPI';

function App() {


  // const saveItem = () => {
  //   const article = { isWindowOpen: true, isFanOn: true };
  //   axios.post('/api/product', article)
  //       .then(response => console.log("---resp---", response.data))
  //       .catch(error => {
  //         console.error('There was an error!', error);
  //     });
  // }

  const uppdateItem = async () => {
    const settings = {isWindowOpen: true, isFanOn: true, humidity: 85 };
    let res = await paramsAPI.updateParams(settings, () => alert('👉 updated'));
    console.log("---Uppdated---");
  }

  return (
    <div className="App">
      <h2>The App!</h2>
      <button onClick={uppdateItem}>Uppdate Item</button>
      <a href="http://localhost:8080/logout">Logout</a> {/* TODO: add server endpoint with logout function */}
      {/* <a href="https://web.lightislands.com/logout">Logout</a> */}
      <Sensors />
      <Controls />
    </div>
  );
}

export default App;
