import { useAuth } from "../Components/Authentication/auth";
import { Link } from "react-router-dom";
import Comment from "../Components/Comment/Comment";
import { useState } from "react";

export default function Sample() {
  const auth = useAuth();
  const [isCommentOpen, setIsCommentOpen] = useState();

  return (
    <div>
      <h2>😉 Dont worry, just a sample page!</h2>
      {auth.user && <h3>🫵 Name: {auth.user.email}</h3>}
      <Link to={"/home"}>{"> "}🏠 Home Page</Link>
      <br />
      <Link to={"/logout"}>{"> "}💔 Logout</Link>
      <br />
      <Link to={"/messenger"}>{"> "}💔 message</Link>
      <br />
      <Link to={"/profile"}>{"> "}💔 profile</Link>
      <br />
      <button onClick={() => setIsCommentOpen(true)}>Comment</button>
      {isCommentOpen != null && (
        <Comment
          setIsCommentOpen={setIsCommentOpen}
          postId={"645cc6ec39dcfa1ffcb9e2fc"}
          postAuthor={auth.user.id}
          commentResourceLink={
            "http://localhost:8081/comment?post=645cc6ec39dcfa1ffcb9e2fc"
          }
        />
      )}
    </div>
  );
}
