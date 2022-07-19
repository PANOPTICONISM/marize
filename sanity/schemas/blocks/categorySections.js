import supportedLanguages from "../locale/supportedLanguages";

export default {
  name: "categorySections",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
    },
  ],
  fields: [
    {
      name: "imageOne",
      title: "Imagem - #1",
      type: "image",
    },
    {
      name: "firstBox",
      title: "Texto do butão",
      type: "localeString",
    },
    {
      name: "imageTwo",
      title: "Imagem - #2",
      type: "image",
    },
    {
      name: "secondBox",
      title: "Texto do butão",
      type: "localeString",
    },
  ],
};
