export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nome",
      type: "string",
    },
    {
      name: "image",
      title: "Imagem principal",
      type: "image",
    },
    {
      name: "slogan",
      title: "Slogan em cima da imagem principal",
      type: "string",
    },
    {
      name: "imagesGallery",
      title: "Logos de marcas vendidas na loja (max. 5)",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "newArrivals",
      title: "Nome em cima de artigos mais recents",
      type: "string",
    },
    {
      name: "body",
      title: "Categorias",
      type: "categorySections",
    },
  ],
};
