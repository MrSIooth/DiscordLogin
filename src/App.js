import React, { useEffect, useState } from "react";
import "./App.css";
import AccountsRows from './AccountsRows';
import 'bootstrap/dist/css/bootstrap.min.css';
var browser = require("webextension-polyfill");

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addError, setAddError] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const key = "DiscordLogin"
    browser.storage &&
      browser.storage.sync.get([key]).then((result) => {
        const accounts = result[key];
        setAccounts(accounts);
      });
  }, []);

  const setAccount = async (email, password) => {
    if (email === "" || password === ""){
        setAddError("Missing parameter")
      return;
    }
    const key = "DiscordLogin"
    let accounts
    let obj = {}
    if (browser.storage) {
      let result = await browser.storage.sync.get([key])
      accounts = result[key];
    }
    if (!accounts)
      accounts = []
    for (let account of accounts) {
      if (account.email === email) {
        setAddError("Account already exist")
        return
      }
    }
    setAddError("")
    setEmail("")
    setPassword("")
    accounts.push({email: email, password: password})
    obj[key] = accounts
    browser.storage && browser.storage.sync.set(obj).then(() => {});
    setAccounts(accounts);
  }

  const loginErrorFunct = (error) => {
    setLoginError(error)
  }

  const removeAccount = async (email) => {
    const key = "DiscordLogin"
    let accounts
    let obj = {}
    if (browser.storage) {
      let result = await browser.storage.sync.get([key])
      accounts = result[key];
    }
    if (!accounts)
      accounts = []
    accounts = accounts.filter(function(value){ 
      return value.email !== email;
    })
    obj[key] = accounts
    browser.storage && browser.storage.sync.set(obj).then(() => {});
    setAccounts(accounts);
    console.log(accounts);
  }

  const changeOrder = async (accounts) => {
    const key = "DiscordLogin"
    let obj = {}
    obj[key] = accounts
    browser.storage && browser.storage.sync.set(obj).then(() => {});
    setAccounts(accounts);
    console.log(accounts);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccount(email, password)
  }

  return (
    <div
      className="App"
      style={{
        width: "375px",
        minHeight: "600px",
        backgroundColor: "#36393f",
        fontFamily: "Ginto,'Helvetica Neue',Helvetica,Arial,sans-serif;",
        fontWeight: "600",
      }}
    >
      <header style={{
        alignItems: "center",
        color:" #fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px 0px 10px 0px",
      }}>
        <img src="Discord-Logo+Wordmark-White.svg" alt="React Logo" style={{height: "50px"}}/>
      </header>
      {(loginError && loginError !== "") && <p style={{margin: "0px 0px 10px 0px", color: "red"}}>{loginError}</p>}
      <div>
        {accounts.length > 0 && <AccountsRows accounts={accounts} removeAccount={removeAccount} loginErrorFunct={loginErrorFunct} changeOrder={changeOrder}/>
        }
        </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        alignItems: "center",
        borderTop: (!accounts || accounts.length === 0)? '2px solid hsla(0,0%,100%,0.06)' : "",
        borderBottom: '2px solid hsla(0,0%,100%,0.06)',
        padding: "10px 0px 10px 0px",
        margin: "0px 10px 0px 10px",
        textAlign: "start",
      }}>
        <form onSubmit={handleSubmit} className="login">
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <input type="email" id="email-input" name="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)}
                style={{
                  width: "47%",
                  backgroundColor: "#2f3136",
                  border: "0px none",
                  borderRadius: "7px",
                  padding: "0px",
                  textIndent: "10px",
                  color: "white",
            }}
              />
          
              <input type="password" id="password-input" name="password" value={password} placeholder="password" onChange={e =>setPassword(e.target.value)}
                style={{
                  width: "47%",
                  backgroundColor: "#2f3136",
                  border: "0px none",
                  borderRadius: "7px",
                  padding: "0px",
                  textIndent: "10px",
                  color: "white",
            }}
              />
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0px 0px 0px 7px",
              padding: "0px"
            }}>
              <button type="submit" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: "0px none",
                width: "36px",
                height: "36px",
                backgroundColor: "#2f3136",
                color: "hsl(359, 82.6%, 59.4%)",
                margin: "0px 5px 0px 5px",
                padding: "0px"
              }}>
              <img src="add-green.svg" alt="Add" style={{
                width: "24px",
                height: "24px"
              }}/>
              </button>
            </div>
          </div>
        </form> 
        <div style={{color: "#ed4043"}}>

          {(addError && addError !== "") && <p style={{margin: "5px 0px 0px 0px"}}>{addError}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
