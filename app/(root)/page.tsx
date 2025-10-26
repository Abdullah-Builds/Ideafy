import SearchForm from "../components/SearchForm";
import Card from "../components/Card";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {


  const query = (await searchParams).query;
  const params = {search:query|| ""};
  const  post  = await sanityFetch({ query: STARTUPS_QUERY,params }) || {};
  const posts = Array.isArray(post.data) ? post.data : [];
  

  return (
    <>
      <section className="bg-pink-600 h-auto pt-10 pb-6 pattern">
        <h1 className="heading">
          PITCH YOUR STARTUP AND CONNECT WITH ENTERPRENUERS
        </h1>
        <p className="text-amber-50 text-center pb-4">
          Submit ideas ,Vote on pitch and Get Noticed in Virtual Competition
        </p>

        <SearchForm query={query} />
      </section>

      <section className="mt-4 px-2 py-2">
        <p className="font-bold text-2xl text-center">
          {query ? `Search Results for ${query}` : "All Startups"}
        </p>
        <div className="mt-9">
          <div className="container mx-auto px-4 py-8 ">
            <div className="grid gap-6 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {posts.map((post: any) => (
                <Card key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <SanityLive />
    </>
  );
}
