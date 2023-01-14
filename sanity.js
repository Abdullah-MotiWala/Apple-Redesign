import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "Production",
  token: process.env.SANITY_API_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2023-01-14",
  useCdn: process.env.NODE_ENV === "production"
};

export const sanityClient = createClient(config);

export const urlfor = (source) => createImageUrlBuilder(config).image(source);
