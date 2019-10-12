import React from "react";

function Chat(props) {
  console.log("hhhhh", props.userMessage);

  return (
    <div>
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
        <button type="submit" onClick={props.chatBtnClick}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
