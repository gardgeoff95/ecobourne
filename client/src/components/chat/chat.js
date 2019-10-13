import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './chat.css';

function Chat(props) {
  console.log("hhhhh", props.userMessage);

  return (
    <Container>
      {/* In Styling this element should include the property list-style-type: none 
            also in order to make it work like a chat I think it needs overflow auto or overflow scroll*/}
      <ul className="messageLog">
        {props.chatLog.map(user => {
          var name = user.user;
          var message = user.msg;
          return (
            <li>
              <p>
                {name} : {message}
              </p>
            </li>
          );
        })}
      </ul>
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
    </Container>
  );
}

export default Chat;
