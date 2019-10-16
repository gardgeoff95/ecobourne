import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "./chat.css";

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
            <div id='chatTestBtn'>
              <button id="chatSendBtn" type="submit" onClick={props.chatBtnClick}>
                Send
        </button>
            </div>
          </form>
        </Row>
      </div>
    </Container>
  );
}

export default Chat;
