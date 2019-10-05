import React from "react";

function Chat(props) {
  console.log("hhhhh", props);
  return (
    <div>
      {/* In Styling this element should include the property list-style-type: none */}
      <ul className="messageLog">
        <li>
          <p>
            {props.currentUser} : {props.userMessage}
            {/* {props.currentUser.map(username => {
              username;
            })}{" "}
            :{" "}
            {props.userMessage.map(message => {
              message;
            })} */}
          </p>
        </li>
      </ul>
      <form action="">
        <input
          id="message"
          autocomplete="off"
          name="userMessage"
          onChange={props.onMessageChange}
        />
        <button type="submit" onClick={props.chatBtnClick}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
