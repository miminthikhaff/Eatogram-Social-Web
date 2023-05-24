import axios from "axios";
import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import { useAuth } from "../Authentication/auth";
import CommentEditor from "./CommentEditor";
import CommentCreator from "./CommentCreator";
import FIlterComments from "./FIlterComments";
import { toast } from "react-toastify";

// icons
import { IoClose, IoHeart, IoHeartOutline } from "react-icons/io5";

// styles
import "./Comment.css";
import "./CommentMobile.css";
import { RiReplyLine } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";

export default function Comment({
  setIsCommentOpen,
  postId,
  commentResourceLink,
  postAuthor,
  postTitle,
}) {
  const cookies = new Cookie();
  const [comments, setComments] = useState([]);
  const [commentsBackup, setCommentsBackup] = useState([]);
  const [editable, setEditable] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isReplying, setIsReplying] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [created, setCreated] = useState(false);
  const [replies, setReplies] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("recent");
  const [liked_comments, setLikedComments] = useState(false);
  const [own_comments, setOwnComments] = useState(false);

  // loading states
  const [saveLoading, setSaveLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);

  const auth = useAuth();
  let options = {};

  if (!auth.social) {
    options = {
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-type": "application/json",
      },
    };
  } else {
    options = {
      withCredentials: true,
    };
  }

  useEffect(() => {
    async function getComments() {
      await getPostComments();
    }
    getComments();
    // eslint-disable-next-line
  }, [isEditing, created, deleted]);

  async function getPostComments() {
    setGetLoading(true);
    await axios
      .get(commentResourceLink + "?post=" + postId, options)
      .then((res) => {
        setComments([...res.data]);
        setCommentsBackup([...res.data]);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setCommentsBackup([]);
        } else if (err?.response?.status === 500) {
          console.log("Cannot contact server");
        } else {
          console.log(err);
        }
      });
    setGetLoading(false);
  }

  async function editorSaveButtonHandler(newComment) {
    await axios
      .put(commentResourceLink, newComment, options)
      .then((res) => {
        setIsEditing(null);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          console.log("Comment not found");
        } else if (err?.response?.status === 500) {
          console.log("Cannot contact server");
        } else {
          console.log(err);
        }
      });
  }

  async function deleteCommentHandler(commentDeleteLink, cid) {
    comments.filter((comment) => comment.id !== cid);

    await axios
      .delete(commentDeleteLink, options)
      .then((res) => {})
      .catch((err) => {
        if (err?.response?.status === 404) {
          console.log("Comment not found");
        } else if (err?.response?.status === 500) {
          console.log("Cannot contact server");
        } else {
          console.log(err);
        }
      });
    setDeleted(!deleted);
  }

  const auth_user = auth.user.id;

  function getEditable() {
    comments.map((comment) => {
      if ((comment.author.id === auth_user) & !editable.includes(comment.id)) {
        setEditable((prev) => [...prev, comment.id]);
      }
      return null;
    });
  }

  useEffect(() => {
    getEditable();
    // eslint-disable-next-line
  }, [commentsBackup]);

  function editButtonHandler(comment) {
    setIsEditing(comment.id);
  }

  function cancelEditButtonHandler() {
    setIsEditing(null);
  }

  async function createCommentHandler(comment) {
    setSaveLoading(true);
    await axios
      .post("http://localhost:8081/comment", comment, options)
      .then((res) => {
        toast.success("Your comment is saved");
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          toast.error("Cannot contact server");
        } else console.log(err);
      });
    setCreated(!created);
    setSaveLoading(false);
  }

  async function createReplyHandler(reply) {
    setSaveLoading(true);
    await axios
      .post("http://localhost:8081/comment/reply", reply, options)
      .then((res) => {})
      .catch((err) => {
        if (err?.response?.status === 500) {
          console.log("Cannot contact server");
        } else console.log(err);
      });
    setIsReplying(null);
    setCreated(!created);
    setSaveLoading(false);
  }

  function searchAndFilterHandler() {
    var postFilter = commentsBackup;
    if (filter !== "") {
      postFilter = postFilter.filter((comment) => comment.label === filter);
    }
    if (search !== "") {
      postFilter = postFilter.filter(
        (comment) =>
          comment.description.includes(search) ||
          comment.author?.username?.includes(search) ||
          comment.author.email.includes(search) ||
          comment.label.includes(search)
      );
    }
    if (liked_comments) {
      postFilter = postFilter.filter((comment) =>
        comment.userLikes.includes(auth_user)
      );
    }
    if (own_comments) {
      postFilter = postFilter.filter(
        (comment) => comment.author.id === auth_user
      );
    }

    if (sort === "recent") {
      postFilter = postFilter.sort((a, b) =>
        Date.parse(a.createdDate) > Date.parse(b.createdDate) ? 1 : -1
      );
    } else if (sort === "loved") {
      postFilter = postFilter.sort((a, b) => b.likes - a.likes);
    }

    setComments([...postFilter]);
  }

  useEffect(() => {
    searchAndFilterHandler();
    // eslint-disable-next-line
  }, [search, filter, liked_comments, commentsBackup, own_comments, sort]);

  async function likeButtonHandler(c) {
    comments.map((comment) => {
      if (comment.id === c.id) {
        comment.userLikes.push(auth.user);
        comment.likes = parseInt(comment.likes) + 1;
      }
    });
    await axios
      .post(
        getLink(c, "like"),
        {
          id: c.id,
          user: auth_user,
        },
        options
      )
      .then((res) => {})
      .catch((err) => {
        if (err?.reponse?.status === 404) {
          console.log("Comment not found");
        } else if (err?.response?.status === 500) {
          console.log("Cannot contact server");
        } else {
          console.log(err);
        }
      });

    setCreated(!created);
  }

  async function unlikeButtonHandler(c) {
    await axios
      .post(
        getLink(c, "unlike"),
        {
          id: c.id,
          user: auth_user,
        },
        options
      )
      .then((res) => {})
      .catch((err) => {
        if (err?.response?.status === 404) {
          console.info("Comment not found to delete");
        } else if (err?.response?.status === 500) {
          console.log("Cannot contact server");
        } else {
          console.log(err);
        }
      });

    setDeleted(!deleted);
  }

  const reactions = {
    drool: "🤤",
    love: "😍",
    hate: "🤮",
  };

  function getLink(c, rel) {
    return c.links.find((link) => {
      return link.rel === rel;
    }).href;
  }

  return (
    <div className="background_container">
      <div className="comment_container">
        {getLoading && (
          <BeatLoader
            size={8}
            className="comment_container__comments_loader"
            color="var(--gray_2)"
          />
        )}
        <button
          className="comment_container__close "
          onClick={() => setIsCommentOpen(null)}
        >
          <IoClose />
        </button>
        <FIlterComments
          setLikedComments={setLikedComments}
          search={search}
          filter={filter}
          sort={sort}
          setSearch={setSearch}
          setFilter={setFilter}
          setSort={setSort}
          setOwnComments={setOwnComments}
          postTitle={postTitle}
        />
        <ul className="comment_container__comments">
          {comments.map((c) => (
            <li key={c.id} className="comment_container__comments_user_comment">
              {(isEditing === c.id) & editable.includes(c.id) ? (
                <CommentEditor
                  comment={c}
                  editorSaveButtonHandler={editorSaveButtonHandler}
                  cancel={cancelEditButtonHandler}
                />
              ) : (
                <div className={editable.includes(c.id) ? "own_comment" : ""}>
                  <div>
                    {!editable.includes(c.id) && (
                      <div className="user_comment_reactions">
                        {c.label === "love"
                          ? reactions.love
                          : c.label === "drool"
                          ? reactions.drool
                          : reactions.hate}
                      </div>
                    )}
                    {c.description !== "" && (
                      <div
                        className={
                          editable.includes(c.id)
                            ? "user_comment_comment own_comment"
                            : "user_comment_comment"
                        }
                      >
                        {!editable.includes(c.id) && (
                          <span className="user_comment_username">
                            {c.author.username
                              ? c.author.username
                              : c.author.email}
                          </span>
                        )}
                        {c.description}
                      </div>
                    )}
                    {editable.includes(c.id) && (
                      <div className="user_comment_reactions">
                        {c.label === "love"
                          ? reactions.love
                          : c.label === "drool"
                          ? reactions.drool
                          : reactions.hate}
                      </div>
                    )}
                    {!editable.includes(c.id) ? (
                      c.userLikes.includes(auth_user) ? (
                        <button className="like active">
                          <IoHeart
                            color="red"
                            onClick={() => unlikeButtonHandler(c)}
                          />
                        </button>
                      ) : (
                        <button
                          className="like"
                          onClick={() => {
                            if (!c.userLikes.includes(auth_user)) {
                              c.userLikes.push(auth_user);
                            }
                            likeButtonHandler(c);
                          }}
                        >
                          <IoHeartOutline />
                        </button>
                      )
                    ) : null}
                  </div>

                  <div className="user_comment__actions">
                    <button className="no_button_icon">
                      <IoHeart color="var(--gray_2)" /> {c.likes} likes
                    </button>
                    {c.edited && (
                      <button className="no_button_icon user_comment__edited">
                        {"Edited"}
                      </button>
                    )}
                    <button
                      className="no_button_icon"
                      onClick={() => {
                        if (!replies) {
                          setReplies({
                            commentId: c.id,
                            replies: c.replies,
                          });
                        } else {
                          setReplies(null);
                        }
                      }}
                    >
                      View replies
                    </button>
                    {editable.includes(c.id) ? (
                      <>
                        <button
                          className="user_comment__actions__edit no_button_icon"
                          onClick={() => editButtonHandler(c)}
                        >
                          Edit
                        </button>
                        <button
                          className="user_comment__actions__delete no_button_icon"
                          onClick={() =>
                            deleteCommentHandler(getLink(c, "delete"), c.id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    ) : postAuthor === auth_user ? (
                      <>
                        <button
                          className="no_button_icon"
                          onClick={() =>
                            setIsReplying({
                              commentId: c.id,
                              email: c.author.username
                                ? c.author.username
                                : c.author.email,
                            })
                          }
                        >
                          <RiReplyLine color="var(--gray_2)" /> Reply
                        </button>

                        <button
                          className="user_comment__actions__delete no_button_icon"
                          onClick={() =>
                            deleteCommentHandler(getLink(c, "delete"))
                          }
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className="no_button_icon"
                        onClick={() =>
                          setIsReplying({
                            commentId: c.id,
                            email: c.author.username
                              ? c.author.username
                              : c.author.email,
                          })
                        }
                      >
                        <RiReplyLine color="var(--gray_2)" /> Reply
                      </button>
                    )}
                  </div>
                  {replies !== null
                    ? replies?.commentId === c.id && (
                        <ul className="comment__replies">
                          {replies.replies !== [] &&
                            replies.replies.map((reply) => (
                              <li key={reply.id}>
                                <span className="comment__reply user_comment_username">
                                  {reply.author.username
                                    ? reply.author.username
                                    : reply.author.email}
                                </span>
                                {reply.description}
                              </li>
                            ))}
                        </ul>
                      )
                    : null}
                </div>
              )}
            </li>
          ))}
          {(comments.length === 0) & !getLoading ? (
            <li className="comment_container__comments_user_comment">
              No Comments
            </li>
          ) : null}
        </ul>

        <CommentCreator
          postId={postId}
          createCommentButtonHandler={createCommentHandler}
          commentId={isReplying}
          createReplyHandler={createReplyHandler}
          setCommentId={setIsReplying}
          saveLoading={saveLoading}
        />
      </div>
    </div>
  );
}
