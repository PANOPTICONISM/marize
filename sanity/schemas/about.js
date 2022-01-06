export default {
  name: "About",
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
      type: "string",
    },
    {
      name: "hero",
      title: "Imagem por baixo do titulo",
      type: "image",
    },
    {
      name: "description",
      title: "Historia",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "bulletPoints",
      title: "Porque visitar a loja?",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      title: "Imagem por baixo do 'porque'",
      type: "image",
    },
    {
      name: "subheading",
      title: "Titulo sobre as fotos",
      type: "string",
    },
    {
      name: "storeImages",
      title: "Images da loja (max. 3)",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
