import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Base")
    .items([
      // Make a new list item
      S.listItem()
        // Give it a title
        .title("Artigos")
        .child(
          // Make a list in the second pane called Portfolio
          S.list()
            .title("Artigos")
            .items([
              // Add the first list item
              S.listItem()
                .title("Lista de Artigos")
                // This automatically gives it properties from the project type
                .schemaType("product")
                .child(S.documentTypeList("product").title("Artigo")),
              S.listItem()
                .title("Categorias")
                .schemaType("category")
                .child(S.documentTypeList("category").title("Categories")),
              S.listItem()
                .title("Vendedores")
                .schemaType("vendor")
                .child(S.documentTypeList("vendor").title("Vendedor")),
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
