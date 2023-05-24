import { useState } from "react";

export default function CommentEditor({
  comment,
  editorSaveButtonHandler,
  cancel,
}) {
  const [description, setDescription] = useState(comment.description);
  const [label, setLabel] = useState(comment.label);

  function saveButtonHandler() {
    const newComment = {
      id: comment.id,
      description: description,
      label: label,
    };

    editorSaveButtonHandler(newComment);
  }

  return (
    <div className="comment_container__create_comment comment_container__edit_comment">
      <textarea
        type="text"
        placeholder="Just remember to be nice 😇"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={label} onChange={(e) => setLabel(e.target.value)}>
        <option default value="love">
          😍
        </option>
        <option value="hate">🤮</option>
        <option value="drool">🤤</option>
      </select>
      <div>
        <button className={"primary"} onClick={saveButtonHandler}>
          Save
        </button>
        <button className="danger" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
