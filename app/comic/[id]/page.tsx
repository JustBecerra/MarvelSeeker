"use client";
import { ComicData } from "@/components/ComicData";
import { fetchIssueById } from "@/redux/features/comic/comic-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ComicDetail({ params }: { params: { id: number } }) {
  const status = useAppSelector((state) => state.comicsReducer.status);
  const ComicDetail = useAppSelector(
    (state) => state.comicsReducer.comicDetail
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchIssueById(params.id));
      } catch (error) {
        console.error("Error fetching comic:", error);
      }
    };

    fetchData();
  }, [dispatch, params.id]);
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === "loading" ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ComicData ComicDetail={ComicDetail[0]} />
    </Box>
  );
}
