import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import React from "react";
import { after } from "next/server";

export default async function View({ id }: { id: string }) {
  const result = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS, { id });

  const totalViews = Array.isArray(result)
    ? result[0]?.views ?? 0
    : result?.views ?? 0;

  after(async ()=>{
    await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();
  })

  return <div className="bg-amber-500">Views: {totalViews + 1}</div>;
}
