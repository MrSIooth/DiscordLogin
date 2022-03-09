import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
var browser = require("webextension-polyfill");

const AccountsRows = (props) => {

  const accountRow = (email, password, topBorder) => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: (topBorder)? '2px solid hsla(0,0%,100%,0.06)' : "",
        borderBottom: '2px solid hsla(0,0%,100%,0.06)',
        padding: "10px 0px 10px 0px",
        margin: "0px 10px 0px 10px",
        textAlign: "start",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexGrow: "1",
          overflow: "hidden",
        }}>
          <img src="discord-logo-white.png" alt="Logo" style={{height: "32px", margin: "0px 10px 0px 10px", flexBasis: "auto"}}/>
          <div style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
      }}>
            <div style={{flexBasis: "47%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{email}</div>
            <div style={{flexBasis: "47%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", webkitTextSecurity: "disc"}}>{password}</div>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "0px 0px 0px 7px"
        }}>
          <div onClick={() => {props.removeAccount(email)}} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            backgroundColor: "#2f3136",
            color: "hsl(359, 82.6%, 59.4%)",
            margin: "0px 5px 0px 5px"
          }}>
            <img src="clear.svg" alt="Earse" style={{
              width: "24px",
              height: "24px"
            }}/>
          </div>
        </div>
      </div>
    )
  }

  const accountsRows = () => {
    var rows = []
    props.accounts.forEach((account, index) => {
        rows.push(accountRow(account.email, account.password, index === 0));
    })
    return <div>{rows}</div>;
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      color: "white",
    }}>
        {accountsRows()}
    </div>
  );
};

export default AccountsRows;
