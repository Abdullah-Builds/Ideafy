import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_BY_QUERY_BY_ID } from "@/sanity/lib/queries";
import React from "react";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { query?: string };
}) {
  const { id } = params;
  const queryParam = searchParams?.query;

  const post = await sanityFetch({ query: STARTUP_BY_QUERY_BY_ID, params: { id } });
  if (!post) return notFound();
  console.log(post.data[0]);

  return (
    <div>
      <h1>{post.data[0]?.title ?? "Startup not found"}</h1>
    </div>
  );
}

