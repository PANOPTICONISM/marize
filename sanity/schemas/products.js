import supportedLanguages from "./locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      title: "Titulo",
      name: "title",
      type: "localeString",
    },
    {
      title: "Imagens",
      name: "images",
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
      title: "Este artigo está em saldos?",
      name: "discounted",
      type: "boolean",
    },
    {
      name: "vendor",
      title: "Vendedor",
      type: "reference",
      to: { type: "vendor" },
    },
    {
      name: "category",
      title: "Categoria",
      type: "reference",
      to: { type: "category" },
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
