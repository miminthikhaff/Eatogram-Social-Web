import { useEffect, useState } from "react";

import { RiReplyLine, RiSendPlane2Fill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { useAuth } from "../Authentication/auth";

import BeatLoader from "react-spinners/BeatLoader";

export default function CommentCreator({
  postId,
  createCommentButtonHandler,
  createReplyHandler,
  commentId,
  setCommentId,
  saveLoading,
}) {
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("love");
  const [warning, setWarning] = useState(null);
  const maxCommentLength = 200;
  const auth = useAuth();

  function createReplyButtonHandler() {
    const reply = {
      commentId: commentId.commentId,
      description: description,
      author: auth.user,
    };

    createReplyHandler(reply);
    setDescription("");
  }
  function createCommentHandler() {
    const newComment = {
      description: description,
      label: label,
      post: postId,
      author: auth.user,
    };

    createCommentButtonHandler(newComment);
    setDescription("");
    setLabel("love");
  }

  useEffect(() => {
    if (description.length >= maxCommentLength) {
      setWarning("Maximum number of words in a comment reached");
    } else {
      setWarning(null);
    }
  }, [description]);

  function handleDescriptionChange(e) {
    if (e.target.value.length <= maxCommentLength) {
      setDescription(e.target.value);
    }
  }

  return (
    <div className="comment_container__create_comment">
      {warning && (
        <div className="comment_container__create_comment__warning">
          <TiWarning size={18} />
          {warning}
        </div>
      )}
      <textarea
        className={commentId ? "replying" : null}
        type="text"
        placeholder={
          !commentId
            ? "Just remember to be nice 😇"
            : "Reply to " + commentId.email + "'s comment"
        }
        value={description}
        onChange={(e) => handleDescriptionChange(e)}
      />
      {!commentId && (
        <select value={label} onChange={(e) => setLabel(e.target.value)}>
          <option value="love">😍</option>
          <option value="hate">🤮</option>
          <option value="drool">🤤</option>
        </select>
      )}
      {!commentId ? (
        <button onClick={createCommentHandler} className="no_button_icon send">
          {!saveLoading ? (
            <RiSendPlane2Fill color={"white"} />
          ) : (
            <BeatLoader size={8} color="var(--light)" />
          )}
        </button>
      ) : (
        <div className="replying__actions">
          <button
            onClick={createReplyButtonHandler}
            className="no_button_icon replying"
          >
            {!saveLoading ? (
              <RiReplyLine color={"white"} />
            ) : (
              <BeatLoader size={8} color="var(--light)" />
            )}
          </button>
          <button
            style={{ backgroundColor: "var(--gray_1)" }}
            onClick={() => setCommentId(null)}
          >
            <FaTimes color="black" />
          </button>
        </div>
      )}
    </div>
  );
}
