"use client";
import { ComicData } from "@/components/ComicData";
import { fetchIssueById } from "@/redux/features/comic/comic-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ComicDetail({ params }: { params: { id: number } }) {
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
  }, [dispatch]);
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
      <ComicData ComicDetail={ComicDetail[0]} />
    </Box>
  );
}
