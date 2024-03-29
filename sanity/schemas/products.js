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
      to: [{ type: "accessory" }, { type: "clothing" }],
    },
    {
      title: "Tamanhos e cores",
      name: "variants",
      type: "array",
      of: [
        {
          title: "Variantes",
          type: "productVariant",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
};
