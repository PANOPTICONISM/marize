//makes sure that there are no duplicate categories in array
export default function uniqueCategories(
    category: Iterable<unknown> | null | undefined
) {
    if (category === undefined) {
        return;
    }
    let cat = new Set(category);
    console.log(cat);
    const categories = Array.from(cat);
    console.log(categories);
    return categories;
}
