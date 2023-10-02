import supportedLanguages from "./locale/supportedLanguages";
const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nome",
      type: "string",
    },
    {
      name: "heading",
      title: "Titulo",
      type: "localeString",
    },
    {
      name: "hero",
      title: "Imagem por baixo do titulo",
      type: "image",
    },
    {
      name: "description",
      title: "Historia",
      type: "localeBlockContent",
    },
    {
      name: "bulletPoints",
      title: "Porque visitar a loja?",
      type: "localeBlockContent",
    },
    {
      name: "image",
      title: "Imagem por baixo do 'porque'",
      type: "image",
    },
    {
      name: "subheading",
      title: "Titulo sobre as fotos",
      type: "localeString",
    },
    {
      name: "storeImages",
      title: "Images da loja (max. 3)",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
};
