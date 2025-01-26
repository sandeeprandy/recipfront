import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import NewsFeed from "./NewsFeed";
import Footer from "./Footer";
import AddPostModal from "../Models/addPostModel";
import { useSelector } from "react-redux";
import InstagramPost from "./postCards";

const Home = () => {
  const feed = useSelector((state) => state.user.feed);
  const postsContainerRef = useRef(null);
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // To hold the selected post data for details view

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post to show the details
  };

  const handleBackToFeed = () => {
    setSelectedPost(null); // Go back to the feed view
  };

  useEffect(() => {
    const postsContainer = postsContainerRef.current;

    const handleScroll = () => {
      const currentScrollPos = postsContainer.scrollTop;
      setShowHeaderFooter(currentScrollPos <= lastScrollPos); // Show footer on scroll up
      setLastScrollPos(currentScrollPos);
    };

    if (postsContainer) {
      postsContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (postsContainer) {
        postsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollPos]);

  return (
    <Box
      sx={{
        color: "#fff",
        background: "linear-gradient(135deg, skyblue, #4682B4)",
        height:"100vh" // Sky blue to Dark Sky blue gradient
      }}
    >
      <Header />
      {/* If a post is selected, show the PostDetails component */}
      {selectedPost ? (
        <InstagramPost
          data={selectedPost}
          onBack={handleBackToFeed}
          isSinglePost={true}
        />
      ) : (
        <NewsFeed
          feed={feed}
          postsContainerRef={postsContainerRef}
          onPostClick={handlePostClick}
        />
      )}
      <Footer onClick={handleModalOpen} showHeaderFooter={showHeaderFooter} />
      <AddPostModal open={isModalOpen} onClose={handleModalClose} />
    </Box>
  );
};

export default Home;
