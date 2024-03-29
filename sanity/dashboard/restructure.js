export default (S) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Artigos")
        .child(
          S.list()
            .title("Artigos")
            .items([
              S.listItem()
                .title("Lista de Artigos")
                .schemaType("product")
                .child(S.documentTypeList("product").title("Artigo")),
              S.divider(),
              S.listItem()
                .title("Categorias")
                .child(
                  S.list()
                    .title("Categorias")
                    .items([
                      S.listItem()
                        .title("Acessórios")
                        .schemaType("accessory")
                        .child(S.documentTypeList("accessory").title("Lista de acessórios")),
                      S.listItem()
                        .title("Roupas")
                        .schemaType("clothing")
                        .child(S.documentTypeList("clothing").title("Lista de roupas")),
                    ])
                ),
              S.listItem()
                .title("Vendedores")
                .schemaType("vendor")
                .child(S.documentTypeList("vendor").title("Vendedor")),
              S.divider(),
              S.listItem()
                .title("Tamanhos")
                .schemaType("size")
                .child(S.documentTypeList("size").title("Tamanhos")),
              S.listItem()
                .title("Cores")
                .schemaType("colour")
                .child(S.documentTypeList("colour").title("Cores")),
            ])
        ),
      S.listItem()
        .title("Website")
        .child(
          S.list()
            .title("Paginas")
            .items([
              S.listItem()
                .title("Pagina Principal")
                .child(
                  S.document().schemaType("homepage").documentId("homepage")
                ),
              S.listItem()
                .title("Sobre Marize")
                .child(S.document().schemaType("about").documentId("about")),
              S.listItem()
                .title("Pagina de Artigos")
                .child(
                  S.document().schemaType("products").documentId("products")
                ),
            ])
        ),
    ]);
