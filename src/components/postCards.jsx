import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import SendOutlined from "@mui/icons-material/SendOutlined";
import WhatsApp from "@mui/icons-material/WhatsApp";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { formatDistanceToNow } from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const InstagramPost = ({ data, onBack, isSinglePost ,onPostClick }) => {
  const [showMore] = useState(false);
  const createdAt = new Date(data.createdAt);


  const handleWhatsAppClick = (phone) => () => {
    const message = encodeURIComponent('Hello, I would like to know more!');
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 200,
        background: "rgba(252, 247, 247, 0.93)", 
        backdropFilter: "blur(10px)",
        border: "2px solid transparent", 
        borderImage: "linear-gradient(90deg, lightblue, blue, lightblue) 1", 
        boxShadow: "0px 0px 10px 2px rgba(167, 123, 218, 0.7)", 
        borderRadius: "6px",
        ...(isSinglePost && { marginTop: { xs: "9vh", sm: "30px", md: "50px" } }) // Conditional margin
      }}
      
    >
     

      <CardContent orientation="horizontal" sx={{ alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar size="sm" src="/static/logo.png" sx={{ p: 0.5, border: "2px solid", borderColor: "background.body" }} />
        </Box>
        <Typography sx={{ fontWeight: "lg" }}>
          {data.first_name} {data.last_name}
        </Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: "auto" }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>

      <CardOverflow>
        <AspectRatio>
          <img src={data.image} alt="postPic" loading="lazy" />
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <CardContent orientation="horizontal" sx={{ alignItems: "center", mx: -1 }}>
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FavoriteBorder />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm" sx={{ color: '#25D366' }} onClick={handleWhatsAppClick(data.phoneNumber)}>
              <WhatsApp />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}>
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={[{ borderRadius: "50%", width: `max(${6 - index}px, 3px)`, height: `max(${6 - index}px, 3px)` }, 
                  index === 0 ? { bgcolor: "primary.solidBg" } : { bgcolor: "background.level3" }]}
              />
            ))}
          </Box>

          <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </Box>
        </CardContent>

        <Typography sx={{ fontSize: "sm", overflow: "hidden", whiteSpace: showMore ? "normal" : "nowrap", textOverflow: "ellipsis" }}>
          <strong>Price:</strong> {data.Price}Rs
        </Typography>

        {isSinglePost && (
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: "sm" }}><strong>Pin Code:</strong> {data.pinCode}</Typography>
            <Typography sx={{ fontSize: "sm" }}><strong>Village/Street Name:</strong> {data.ilaakaName}</Typography>
            <Typography sx={{ fontSize: "sm" }}><strong>Phone Number:</strong> {data.phoneNumber}</Typography>
            <Typography sx={{ fontSize: "sm" }}><strong>DESCRIPTION:</strong> {data.description}</Typography>
          </Box>
        )}

        {!isSinglePost && (
          <Link component="button" underline="none" sx={{ fontSize: "sm", color: "text.tertiary", mt: 1 }} onClick={onPostClick}>
            "More"
          </Link>
        )}

        <Typography sx={{ fontSize: "10px", color: "text.tertiary", mt: 1 }}>
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </Typography>
      </CardContent>
      {isSinglePost && (
  <Box
    sx={{
      padding: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    }}
  >
    <IconButton
      onClick={onBack}
      sx={{
        marginBottom: 2,
        background: "linear-gradient(90deg, #6dd5fa, #2980b9)", // Gradient background
        color: "#fff",
        border: "2px solid transparent",
        borderRadius: "12px", // Increased for a smoother look
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
        padding: { xs: "8px 16px", sm: "10px 24px" }, // Adjust padding based on screen size
        display: "flex",
        alignItems: "center",
        gap: "8px", // Space between icon and text
        fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size for mobile
        "&:hover": {
          background: "linear-gradient(90deg, #2980b9, #6dd5fa)", // Reverse gradient on hover
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Slightly more shadow on hover
        },
        transition: "all 0.3s ease-in-out", // Smooth animation
      }}
    >
      <ArrowBackIcon sx={{ fontSize: { xs: "18px", sm: "20px" } }} /> {/* Responsive icon size */}
      <Typography
        component="span"
        sx={{
          fontWeight: 600,
          color: "inherit",
          textTransform: "capitalize",
        }}
      >
     
      </Typography>
    </IconButton>
  </Box>
)}

    </Card>
  );
};

export default InstagramPost;
