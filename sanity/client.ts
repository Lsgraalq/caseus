import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "q6so6655",      // твой projectId
  dataset: "caseus",      // твой dataset
  apiVersion: "2024-01-01",   // любая свежая дата
  useCdn: false,
});
