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
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import WhatsApp from "@mui/icons-material/WhatsApp";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { formatDistanceToNow } from "date-fns";

const InstagramPost = (data, key) => {
  const [showMore, setShowMore] = useState(false);
  const createdAt = new Date(data.data.createdAt);

  const toggleMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        "--Card-radius": (theme) => theme.vars.radius.xs,
        background: "rgba(255, 255, 255, 0.2)", // Frosted glass effect
        backdropFilter: "blur(10px)",
        border: "2px solid transparent", // Base border
        borderImage: "linear-gradient(90deg, lightblue, blue, lightblue) 1", // Gradient border
        boxShadow: "0px 0px 10px 2px rgba(172, 118, 74, 0.7)", // Glowing effect
      }}
      key={key}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
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
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src="/static/logo.png"
            sx={{ p: 0.5, border: "2px solid", borderColor: "background.body" }}
          />
        </Box>
        <Typography sx={{ fontWeight: "lg" }}>
          {data.data.first_name} {data.data.last_name}
        </Typography>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={data?.data?.image} alt="postPic" loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", mx: -1 }}
        >
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FavoriteBorder />
            </IconButton>
            {/* <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined />
            </IconButton> */}
            <IconButton variant="plain" color="neutral" size="sm">
              <WhatsApp />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
          >
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={[
                  {
                    borderRadius: "50%",
                    width: `max(${6 - index}px, 3px)`,
                    height: `max(${6 - index}px, 3px)`,
                  },
                  index === 0
                    ? { bgcolor: "primary.solidBg" }
                    : { bgcolor: "background.level3" },
                ]}
              />
            ))}
          </Box>
          <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </Box>
        </CardContent>
        <Typography
          sx={{
            fontSize: "sm",
            overflow: "hidden",
            whiteSpace: showMore ? "normal" : "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <strong>DESCRIPTION:</strong> {data.data.description}
        </Typography>
        {showMore && (
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: "sm" }}>
              <strong>Pin Code:</strong> {data.data.pinCode}
            </Typography>
            <Typography sx={{ fontSize: "sm" }}>
              <strong>Village/Street Name:</strong> {data.data.ilaakaName}
            </Typography>
            <Typography sx={{ fontSize: "sm" }}>
              <strong>Phone Number:</strong> {data.data.phoneNumber}
            </Typography>
          </Box>
        )}
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: "sm", color: "text.tertiary", mt: 1 }}
          onClick={toggleMore}
        >
          {showMore ? "Show Less" : "More"}
        </Link>
        <Typography sx={{ fontSize: "10px", color: "text.tertiary", mt: 1 }}>
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InstagramPost;
