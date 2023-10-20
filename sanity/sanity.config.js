import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schemas/schema";
import deskStructure from "./dashboard/restructure";

export default defineConfig({
  title: "Loja Marize",
  projectId: "902997dt",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemas,
  },
});
