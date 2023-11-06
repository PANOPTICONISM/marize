import supportedLanguages from "./locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "colour",
  title: "Colour",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nome",
      type: "localeString",
    },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
  },
};
