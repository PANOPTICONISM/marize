import supportedLanguages from "./locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "accessory",
  title: "Acessórios",
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
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
};
