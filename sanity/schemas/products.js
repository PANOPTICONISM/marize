import supportedLanguages from "./locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      title: "title",
      name: "title",
      type: "localeString",
    },
    {
      name: "images",
      title: "Imagens",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "body",
      title: "Detalhes",
      type: "localeBlockContent",
    },
    {
      name: "vendor",
      title: "Vendedor",
      type: "reference",
      to: { type: "vendor" },
    },
    {
      name: "category",
      title: "Categorias",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
    {
      title: "Variantes",
      name: "variants",
      type: "array",
      of: [
        {
          title: "Variantes",
          type: "productVariant",
        },
      ],
    },
    // {
    //   name: "slug",
    //   title: "Slug",
    //   type: "slug",
    //   description:
    //     "Carrega o butão para gerar automaticamente (isto serve como url especifica para cada artigo)",
    //   options: {
    //     source: "title",
    //     maxLength: 96,
    //   },
    // },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
};
