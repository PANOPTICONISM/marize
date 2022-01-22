export default {
  name: "vendor",
  title: "Vendor",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nome",
      type: "string",
    },
    // {
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96,
    //   },
    // },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Tem que ser igual aos outros e em .png formato",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
    },
  },
};
