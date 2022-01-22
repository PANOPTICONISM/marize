import supportedLanguages from "./locale/supportedLanguages";

const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "colour",
  title: "Colours",
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
