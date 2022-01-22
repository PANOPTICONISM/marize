import supportedLanguages from "./locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nome",
      type: "localeString",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "parentVendor",
      title: "Categorias relacionadas",
      description:
        'Por exemplo - se "mochilas", aqui tem de se colocar "Caminatta"',
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "vendor" }],
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
