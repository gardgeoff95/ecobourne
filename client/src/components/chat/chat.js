import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './chat.css';

function Chat(props) {
  console.log("hhhhh", props.userMessage);

  return (
    <Container>
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
                  <li id="message">
                    <span id="username">
                      {name} :
                      </span>
                    <span id="userMessage">
                      {message}
                    </span>

                  </li>
                );
              })}
            </ul>
          </div>
          <form action="">
            <input
              id="message"
              autocomplete="off"
              name="userMessage"
              value={props.userMessage}
              onChange={props.onMessageChange}
            />
            <div id="chatSendBtn">
              <button type="submit" onClick={props.chatBtnClick}>
                Send
        </button>
            </div>
          </form>
        </li>
      </ul>
    </Container>
  );
}

export default Chat;
