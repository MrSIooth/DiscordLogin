const browser = require("webextension-polyfill");
const axios = require('axios');

browser.runtime.onMessage.addListener(
   async (data, sender) => {
      const user = {
        "email": data.email,
        "password": data.password
      }
      return axios.post(`https://discord.com/api/v9/auth/login`, user)
      .then(res => {
          window.localStorage.token = `"${res.data.token}"`
          const config = {
            headers:{
              authorization: res.data.token,
            }
          };
          return axios.get(`https://discord.com/api/v9/users/@me`, config)
          .then(res => {
            if (data.relaod)
              window.location.reload();
            return {code: 200, data: {
              username: res.data.username,
              avatar: `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}`
            }};
          }).catch(err => {
            return {code: 400, data: err};
          });
      }).catch(err => {
          if (err.response) {
          return {code: err.response.data.code, data: err.response.data}
        }
      });
   }
 );