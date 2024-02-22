import { useAppSelector } from "@/redux/store";
import { ComicType } from "@/types/ComicTypes";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";

export const ComicData = ({ ComicDetail }: { ComicDetail: ComicType }) => {
  const status = useAppSelector((state) => state.comicsReducer.status);
  const theme = useTheme();
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
      <Backdrop
        sx={{
          color: theme.palette.common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={status === "loading" ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {status === "succeeded" && ComicDetail && (
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            m: { mobile: "0", laptop: "4rem" },
            justifyContent: "center",
            flexDirection: { mobile: "column", laptop: "row" },
          }}
        >
          <Box
            sx={{
              width: { mobile: "100%", laptop: "80%" },
              height: { mobile: "30rem", desktop: "40rem" },
              position: "relative",
            }}
          >
            <Image
              src={`${ComicDetail.thumbnail.path}.${ComicDetail.thumbnail.extension}`}
              fill
              alt={""}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.75rem",
                color: theme.palette.primary.light,
                fontWeight: "600",
              }}
            >
              {ComicDetail.title}
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.primary.light,
                }}
              >
                Published: {formattedDateString}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.primary.light,
                }}
              >
                Writer: {Writer?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.primary.light,
                }}
              >
                Penciler: {Penciler?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.primary.light,
                }}
              >
                Cover Artist: {Cover?.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                width: "70%",
                fontSize: "1.125rem",
                color: theme.palette.primary.light,
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
