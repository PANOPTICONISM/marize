export default {
  title: "Product variant",
  name: "productVariant",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Nome",
      type: "string",
      description: "Escolhe uma cor e os tamanhos dessa cor por cada variante",
    },
    {
      name: "colours",
      title: "Cor",
      type: "reference",
      to: { type: "colour" },
    },
    {
      name: "sizes",
      title: "Tamanhos",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "size" },
        },
      ],
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
  ],
};
