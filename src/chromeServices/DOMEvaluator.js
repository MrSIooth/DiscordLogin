const browser = require("webextension-polyfill");
const axios = require('axios');

browser.runtime.onMessage.addListener(
   async (data, sender) => {
      console.log("dsjdsdskjdskdksjdsjdjk", data)
      const user = {
        "email": data.email,
        "password": data.password
      }
      return axios.post(`https://discord.com/api/v9/auth/login`, user)
      .then(res => {
          console.log(res);
          console.log(res.data);
          window.localStorage.token = `"${res.data.token}"`
          console.log("added token")
          window.location.reload();
          return
      }).catch(err => {
          console.log(err)
          if (err.response) {
          console.log(err.response)
          return err.response
        }
      });
   }
 );