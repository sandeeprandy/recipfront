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
