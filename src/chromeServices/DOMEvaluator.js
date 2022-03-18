const browser = require("webextension-polyfill");
const axios = require('axios');

browser.runtime.onMessage.addListener(
   (data, sender) => {
      console.log("dsjdsdskjdskdksjdsjdjk", data)
      const user = {
        "email": data.email,
        "password": data.password
      }
      return axios.post(`https://discord.com/api/v9/auth/login`, user)
      .then(res => {
          console.log(res);
          console.log(res.data);
          setInterval(() => {
            document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${res.data.token}"`
          }, 50);
          console.log("added token")
          setTimeout(() => {
            console.log("added token")
            window.location.reload();
          }, 50);
          return
      }).catch(err => {
          console.log(err)
          if (err.response) {
          console.log(err.response)
          return err.response.status
        }
      });
   }
 );