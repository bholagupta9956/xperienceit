import React, { useState } from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ProductReview = (props) => {
  
  const { setRating } = props;
  const [activeStar, setActiveStar] = useState(0);

  const totalStars = 5;
  const activeStars = 3;

  const handleClick = (index) => {
    setActiveStar(index);
    setRating(index + 1);
  };

  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          position: "relative",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {[...new Array(totalStars)].map((arr, index) => {
          return (
            <Box
              position="relative"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => handleClick(index)}
            >
              <Box
                sx={{
                  width: index <= activeStar ? "100%" : "0%",
                  overflow: "hidden",
                  position: "absolute",
                }}
              >
                <StarIcon />
              </Box>
              <Box>
                <StarBorderIcon />
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ProductReview;
