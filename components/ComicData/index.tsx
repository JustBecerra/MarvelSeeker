import { ComicType } from "@/types/ComicTypes";
import { Box, Typography } from "@mui/material";

import React from "react";

export const ComicData = ({ ComicDetail }: { ComicDetail: ComicType }) => {
  console.log(ComicDetail, "asd");
  return (
    <Box>
      <Typography>{ComicDetail.title}</Typography>
    </Box>
  );
};
