import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import AccountsRows from './AccountsRows';
var browser = require("webextension-polyfill");

const App = () => {
  const [url, setUrl] = useState("");
  const [accounts, setAccounts] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addError, setAddError] = useState('');

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    browser.tabs &&
      browser.tabs.query(queryInfo).then((tabs) => {
        const url = tabs[0].url;
        setUrl(url);
      });
  }, []);

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
        setAddError("Missing param")
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
        setAddError("account already exist")
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
        height: "600px",
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
      <div>
        <AccountsRows accounts={(accounts)? accounts : []} removeAccount={removeAccount}/>
      </div>
      <div style={{margin:"10px 0px 0px 0px"}}>
        <form onSubmit={handleSubmit} className="login">
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}>

            <input style={{width: "40%"}} type="email" id="email-input" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        
            <input style={{width: "40%"}} type="password" id="password-input" name="password" value={password} onChange={e =>setPassword(e.target.value)} />
          
            <input style={{borderRadius: "10%", backgroundColor: "hsl(139, 47.3%, 43.9%)", color: "white", border: "0 none"}} type="submit" value="Add" />
          </div>
        </form> 
          {(addError && addError !== "") && <p style={{margin: "5px 0px 0px 0px"}}>{addError}</p>}
      </div>
    </div>
  );
};

export default App;
