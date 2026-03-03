import { sanityFetch } from "@/sanity/lib/live";
import { STARTUP_BY_QUERY_BY_ID } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Banner from "../../../components/banner";
import format_date from "@/app/utils/utils";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";
import View from "../../../components/View";


export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const queryParam = resolvedSearchParams?.query;

  const result = await sanityFetch(
     STARTUP_BY_QUERY_BY_ID,
     { id },
  );
  const post = result;
  if (!post) return notFound();

  return (
    <div>
      <Banner
        text1={post.author?.bio}
        text2={format_date(post._createdAt)}
        text3={post?.author?.bio}
      />
      
      <section className="max-w-7xl mx-auto mt-8 flex items-center justify-between bg-white border border-pink-100 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.image}
            alt={post.author?.name || "Author profile"}
            width={70}
            height={60}
            className="rounded-full object-cover border border-pink-200 shadow-sm"
          />
          <span className="text-gray-800 font-medium">
            {post.author?.username}
          </span>
        </div>

        <span className="text-sm font-semibold text-pink-500 bg-pink-100 px-3 py-1 rounded-full">
          {post.category}
        </span>
      </section>

      <section>
        <section className="mx-auto flex justify-evenly py-3">
          <img
            src={post?.image}
            alt={post.author?.name || "Author image"}
            width={300}
            height={200}
            className="rounded-2xl object-cover shadow-lg border-2 to-black"
          />
        </section>

        <section className="max-w-6xl mx-auto my-10 px-6 py-8 bg-gradient-to-b from-pink-50 to-white rounded-2xl shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">
            Startup Pitch
          </h2>

          <Suspense
            fallback={
              <p className="text-center text-gray-400">Loading pitch...</p>
            }
          >
            <article className="prose prose-pink max-w-none text-gray-700 leading-relaxed">
              <ReactMarkdown>{post?.pitch}</ReactMarkdown>
            </article>
          </Suspense>
        </section>
      </section>

      <section className="flex justify-center">
        <a
          href={`mailto:${post.author?.email}`}
          aria-label="Email author"
          className="mt-3 inline-flex items-center justify-center h-10 w-10 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 8.5L12 13 3 8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>
      <View id={id}/>
    </div>
  );
}
