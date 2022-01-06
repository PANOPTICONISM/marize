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
                .schemaType("Products")
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList("Products").title("Artigo")),
              // Add a second list item
              S.listItem()
                .title("Categories")
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
                  S.document().schemaType("Homepage").documentId("Homepage")
                ),
              S.listItem()
                .title("Sobre Marize")
                .child(S.document().schemaType("About").documentId("About")),
            ])
        ),
    ]);
