import "./message.css"

export default function Message({ message, own, friend }) {
  const time = new Date(message?.createdAt).toString().split(" ")[4].split(":", 2).join(":");

  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-img_container">
        <img
          src={friend?.profilePicture}
          alt=""
        />
      </div>
      <div className="message-content">
        <p className="message-text">{message?.text}</p>
        <p className="message-bottom">{time}</p>
      </div>
    </div>
  )
}