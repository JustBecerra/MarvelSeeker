import { theme } from "@/public/theme/theme";
import { useAppSelector } from "@/redux/store";
import { ComicType } from "@/types/ComicTypes";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const ComicData = ({ ComicDetail }: { ComicDetail: ComicType }) => {
  console.log(ComicDetail, "asd");
  const status = useAppSelector((state) => state.comicsReducer.status);
  const originalDate = new Date(ComicDetail?.modified);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}`;

  const Writer = ComicDetail?.creators?.items.find(
    (creator) => creator.role === "writer"
  );
  const Penciler = ComicDetail?.creators?.items.find((creator) =>
    creator.role.includes("penciler")
  );
  const Cover = ComicDetail?.creators?.items.find((creator) =>
    creator.role.includes("colorist")
  );
  return (
    <>
      {status === "succeeded" && ComicDetail && (
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            m: "4rem",
            justifyContent: "center",
          }}
        >
          <Image
            src={`${ComicDetail.thumbnail.path}.${ComicDetail.thumbnail.extension}`}
            width={700}
            height={700}
            alt={""}
          />
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.75rem",
                color: theme.palette.background.paper,
                fontWeight: "600",
              }}
            >
              {ComicDetail.title}
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.background.paper,
                }}
              >
                Published: {formattedDateString}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.background.paper,
                }}
              >
                Writer:{Writer?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.background.paper,
                }}
              >
                Penciler: {Penciler?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.background.paper,
                }}
              >
                Cover Artist: {Cover?.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                width: "70%",
                fontSize: "1.125rem",
                color: theme.palette.background.paper,
              }}
            >
              {ComicDetail.description}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
