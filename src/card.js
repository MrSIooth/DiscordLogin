import "./App.css";
var browser = require("webextension-polyfill");

const AccountCard = (props) => {

    const connectAccount = (email, password) => {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {email: email, password: password}).then((response) => {
            console.log(response);
            if (response.data.captcha_service) {
              props.loginErrorFunct("Require Captcha")
            } else if (response.data.code === 50035) {
              props.loginErrorFunct("Invalid logins")
            } else {
              props.loginErrorFunct("")
            }
          });
        });
      }

    return (
        <div onClick={() => {connectAccount(props.account.email, props.account.password)}}
        class="div-btn"
        style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: (props.topBorder)? '2px solid hsla(0,0%,100%,0.06)' : "2px solid hsla(0,0%,0%,0)",
        borderBottom: '2px solid hsla(0,0%,100%,0.06)',
        padding: "10px 0px 10px 0px",
        margin: "0px 10px 0px 10px",
        textAlign: "start",
        color: "white",
        fontWeight: "600",
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
            <div style={{flexBasis: "47%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{props.account.email}</div>
            <div style={{flexBasis: "47%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", webkitTextSecurity: "disc"}}>{props.account.password}</div>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "0px 0px 0px 7px"
        }}>
          <div onClick={(event) => {
              console.log("dffhduhfdufdhfduf", props.removeAccount)
                event.stopPropagation()
                props.removeAccount(props.account.email)
            }}
            style={{
            zIndex: 100,
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
    );
}

export default AccountCard;