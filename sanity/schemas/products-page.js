import supportedLanguages from "./locale/supportedLanguages";
const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export default {
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "slogan",
      title: "Slogan",
      type: "localeString",
    },
    {
      name: "backgroundImage",
      title: "Imagem de background",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: `slogan.${baseLanguage.id}`,
    },
  },
};
