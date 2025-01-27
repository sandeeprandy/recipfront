import axiosInstance from "../axiosInstance";

export const fetchUserFeed = async ({pincode, filter,ilaaka}) => {
  try {
    
   

    const validIlaakaName = typeof ilaakaName === "string" ? ilaaka : "";

    const url =
      `/api/posts/getPosts?pinCode=${pincode}&filter=${filter}`+
      (validIlaakaName
        ? `&ilaakaName=${encodeURIComponent(validIlaakaName)}`
        : "");

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching user feed:", error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get("/api/user/profile");
  return response.data;
};

export const followUser = async ({ friendId, userId, status }) => {
  try {
    const response = await axiosInstance.post("/api/user/follow", {
      friendId,
      userId,
      status,
    });
    return response.data; // Handle the response data if needed
  } catch (error) {
    console.error("Error following user:", error.message);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
export const likePost = async ({ postId, userId, status }) => {
  try {
    const response = await axiosInstance.post("/api/post/like", {
      postId,
      userId,
      status,
    });
    return response.data; // Return the response data for further use
  } catch (error) {
    console.error("Error liking post:", error.message);
    throw error; // Throw error for caller to handle
  }
};