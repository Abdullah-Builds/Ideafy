import { defineLive } from 'next-sanity/live'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token:process.env.SANITY_API_READ_TOKEN,
})

export const live = defineLive({
  client,
  serverToken:process.env.SANITY_API_READ_TOKEN ,  
  browserToken: false,
})
