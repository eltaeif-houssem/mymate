import React from "react";
import Header from "@components/headers/Header";

const Home = () => {
  const [search, setSearch] = React.useState<string>("");

  const searchHandler = () => {};

  return (
    <div className="w-full min-h-screen">
      <Header
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onClick={searchHandler}
      />
    </div>
  );
};

export default Home;
