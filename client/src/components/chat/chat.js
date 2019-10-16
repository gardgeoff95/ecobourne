import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "./chat.css";
import { array } from "prop-types";

function Chat(props) {
  // console.log("hhhhh", props.userMessage);

  return (
    <Container>
      <div id='mainDiv'>
        <ul className="pages">
          <li className="chat page">
            {/* In Styling this element should include the property list-style-type: none 
            also in order to make it work like a chat I think it needs overflow auto or overflow scroll*/}

          <div className="chatArea">
            <ul className="messageLog">
              {props.chatLog.map(user => {
                var name = user.user;
                var message = user.msg;
                // if (Array.isArray(message)) {
                //   return (
                //     <p id="userMsg">
                //       {name} :{" "}
                //       {message.map(i => {
                //         {
                //           i;
                //         }
                //       })}
                //     </p>
                //   );
                // } else {
                return (
                  <li>
                    <p id="userMsg">
                      {name} : {message}
                    </p>
                  </li>
                );
                // }
              })}
            </ul>
          </div>
        </li>
      </ul>
      <hr id="chatDivider"></hr>
      <Row id="chatBoxSend">
        <input
          placeholder="Send a message.."
          id="message"
          autocomplete="off"
          name="userMessage"
          value={props.userMessage}
          onChange={props.onMessageChange}
        />
=======
            <div className="chatArea">
              <ul className="messageLog">
                {props.chatLog.map(user => {
                  var name = user.user;
                  var message = user.msg;
                  return (
                    <li>
                      <p id="userMsg">
                        {name} : {message}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </ul>
        <hr id="chatDivider"></hr>
        <Row>
          <form id="chatBoxSend">
            <input
              placeholder="Send a message.."
              id="message"
              autocomplete="off"
              name="userMessage"
              value={props.userMessage}
              onChange={props.onMessageChange}
            />


            <button id="chatSendBtn" type="submit" onClick={props.chatBtnClick}>
              Send
        </button>
          </form>
        </Row>
      </div>
    </Container>
  );
}

export default Chat;
