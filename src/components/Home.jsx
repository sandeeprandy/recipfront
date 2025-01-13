import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFeed } from "../slices/userSlices";
import NewsFeed from "./NewsFeed";

const HomePage = () => {
  const [, setScrollDirection] = useState("down"); // Track scroll direction
  const [userPincode] = useState(() => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    return userinfo?.user[0][0].pin_code;
  });
  const [refreshFeed] = useState(false);

  const dispatch = useDispatch();
  const { feed, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user feed
    dispatch(getUserFeed(userPincode));
  }, [dispatch, userPincode, refreshFeed]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("up"); // Scrolling up
      } else {
        setScrollDirection("down"); // Scrolling down
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && <NewsFeed feed={feed} />}
    </>
  );
};

export default HomePage;
