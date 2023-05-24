export default function FIlterComments({
  search,
  filter,
  sort,
  setSearch,
  setFilter,
  setSort,
  setLikedComments,
  setOwnComments,
  postTitle,
}) {
  const reactions = {
    drool: "🤤 Looks Yummy",
    love: "😍 Loved it",
    hate: "🤮 Hated it",
  };
  return (
    <div className="comment_container__search">
      <div className="comment_container__search__header">
        <h2>{postTitle}</h2>
      </div>
      <div>
        <input
          type="text"
          placeholder={"🔍  Search Comments"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <div>
          <select
            className="comment_container__search__reactions"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value={""}>All Reactions</option>
            <option value={"drool"}>{reactions.drool}</option>
            <option value={"love"}>{reactions.love}</option>
            <option value={"hate"}>{reactions.hate}</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option default value="recent">
              Most recent
            </option>
            <option value="loved">Most loved</option>
          </select>
        </div>
        <div>
          <label className="comment_container__search__liked">
            <input
              className="comment_container__search__liked"
              value="1"
              id="liked_comments"
              onChange={(e) => setLikedComments(e.target.checked)}
              type="checkbox"
            />
            <span>Liked</span>
          </label>
          <label className="comment_container__search__liked">
            <input
              className="comment_container__search__liked"
              value="2"
              id="own_comments"
              onChange={(e) => setOwnComments(e.target.checked)}
              type="checkbox"
            />
            <span>Mine</span>
          </label>
        </div>
      </div>
    </div>
  );
}
