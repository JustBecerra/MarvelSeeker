"use client";
import { ComicData } from "@/components/ComicData";
import { TopBar } from "@/components/TopBar";
import { fetchIssueById } from "@/redux/features/comic/comic-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TopBar />
      <ComicData ComicDetail={ComicDetail[0]} />
    </main>
  );
}
