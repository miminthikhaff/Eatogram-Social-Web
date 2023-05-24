export default function Reply({ replies }) {
  return (
    <ul className="comment_container__replies">
      {replies.map((reply) => (
        <li key={reply.id} className="comment_container__replies__reply">
          {reply.author.email}
          {reply.description}
        </li>
      ))}
    </ul>
  );
}
