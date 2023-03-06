import axios from 'axios';

// const BASE_URL = '';

export default {
  getSensorsData: async () => {
    let res = await axios.get('/api/sensors/params');
    return res.data || [];
  },

  getParams: async () => {
    let res = await axios.get('/api/settings/params');
    return res.data || [];
  },

  // TODO: Add error handler everywhere with popap in UI

  // updateParams: async (settings, callback) => {
  //   try {
  //     const response = await axios.patch('/api/settings/update', settings)
  //     .then((response) => {
  //       callback();
  //     });
  //     // response.data.headers['Content-Type'];
  //     console.log('👉 Returned data:', response);
  //   } catch (error) {
  //     console.log(`😱 Axios request failed: ${error}`);
  //   }
  // },

  updateParams: async (settings, callback = () => {}) => {
    try {
      await axios.patch('/api/settings/update', settings)
      .then(
        callback()
      );
      console.log('👉 Updated');
    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
    }
  }
}