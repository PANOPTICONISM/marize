const sanityClient = require("@sanity/client");

export const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2021-03-25",
  useCdn: true,
});
