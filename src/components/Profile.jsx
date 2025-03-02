import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Grid, Box } from "@mui/material";
import { getUserDeatils } from "../slices/userSlices";
import { useDispatch } from "react-redux";


const ProfilePage = ({userId=1 } ) => {
 
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const dispatch = useDispatch();
  
  useEffect(() => {
   
    dispatch(getUserDeatils(userId));
  }, [dispatch ]);
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
         background: "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
      }}
    >
      <Card sx={{ width: "80%", maxWidth: 900, padding: 4, borderRadius: 3, boxShadow: 3 , 
        background: "linear-gradient(0deg, rgba(128,168,255,1), rgba(173,250,255,1))" }}>
        <Grid container spacing={3}>
          {/* Left Section: Profile & Bio */}
          <Grid item xs={12} md={4} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" , }}>
            <Avatar
              src={userinfo?.user[0][0].profile_pic}
              sx={{ width: 120, height: 120, bgcolor: "#1976D2", mb: 2 }}
            >
              {!userinfo?.user[0][0].profile_pic && userinfo?.user[0][0].first_name[0]}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {userinfo?.user[0][0]?.first_name} {userinfo?.user[0][0]?.last_name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Photographer
            </Typography>
            <Box mt={2} textAlign="left">
              <Typography variant="body1"><strong>Email:</strong> {userinfo?.user[0][0].email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {userinfo?.user[0][0].phone_number}</Typography>
              <Typography variant="body1"><strong>Location:</strong> {userinfo?.user[0][0].ilaaka}</Typography>
              <Typography variant="body1"><strong>Pin Code:</strong> {userinfo?.user[0][0].pin_code}</Typography>
            </Box>
          </Grid>

          {/* Right Section: Info Cards */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {["Bio", "Goals", "Motivations", "Concerns"].map((title, index) => (
                <Grid item xs={12} sm={6} key={title}>
                  <Card sx={{ borderRadius: 2, boxShadow: 2, height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Placeholder content for {title.toLowerCase()}.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProfilePage;
