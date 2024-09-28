import { useState, useEffect } from "react";
import { Users, useFetchUsers } from "../../user";
import { Tweets, useFetchTweets } from "../../tweet";

const Search = ({ title }: { title: string }) => {
  const [tab, setTab] = useState("posts");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { users, usersLoading } = useFetchUsers(debouncedSearch);
  const {
    tweets,
    loading: tweetsLoading,
    refetchTweets,
  } = useFetchTweets(debouncedSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="mainSectionContainer col-10 col-md-8 col-lg-6">
      <div className="titleContainer">
        <h1>{title}</h1>
      </div>
      <div className="searchBarContainer">
        <input
          id="searchBox"
          type="text"
          name="searchBox"
          data-search="posts"
          placeholder="Search for users or posts"
          onChange={(e) => setSearch(e.target.value)} // Update search state immediately
        />
      </div>
      <div className="tabsContainer">
        <a
          className={`tab ${tab === "posts" ? "active" : ""}`}
          href=""
          onClick={(e) => {
            e.preventDefault();
            setTab("posts");
          }}
        >
          <span>Posts</span>
        </a>
        <a
          className={`tab ${tab === "users" ? "active" : ""}`}
          href=""
          onClick={(e) => {
            e.preventDefault();
            setTab("users");
          }}
        >
          <span>Users</span>
        </a>
      </div>
      <div className="resultsContainer">
        {tab === "posts" && debouncedSearch != "" ? (
          tweetsLoading ? (
            <div>Loading...</div>
          ) : tweets.length === 0 ? (
            <div>No results</div>
          ) : (
            <Tweets tweets={tweets} refetchTweets={refetchTweets} />
          )
        ) : tab === "users" && debouncedSearch != "" ? (
          usersLoading ? (
            <div>Loading...</div>
          ) : users.length === 0 ? (
            <div>No results</div>
          ) : (
            <Users users={users} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Search;
