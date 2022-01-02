export default {
  name: 'Products',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo de artigo',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Carrega o butão para gerar automaticamente (isto serve como url especifica para cada artigo)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Variantes',
      name: 'variants',
      type: 'array',
      of: [
        {
          title: 'Variantes',
          type: 'productVariant',
        },
      ],
    },
    {
      name: 'vendor',
      title: 'Vendedores',
      type: 'reference',
      to: {type: 'vendor'},
    },
    {
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'category'},
        },
      ],
    },
    {
      name: 'body',
      title: 'Detalhes',
      type: 'localeBlockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      manufactor: 'manufactor.title',
      media: 'defaultProductVariant.images[0]',
    },
  },
}
