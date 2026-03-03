// Live mode was removed in next-sanity v5.
// Provide a simple passthrough fetch function instead.

import { client } from "./client";

export async function sanityFetch(query: string, params: Record<string, any> = {}) {
  return client.fetch(query, params);
}

export const SanityLive = null; // placeholder so import doesn't break
