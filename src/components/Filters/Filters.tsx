import style from "./filters.module.css";

export function Filters({
    className,
    onChange,
    categories,
}: {
    className?: string;
    onChange: any;
    categories: any[];
}) {
    return (
        <>
            {categories?.map(
                (filter: { name: string; children: any[] }, index: number) => (
                    <div className={style.filters_products} key={index}>
                        <h4>{filter.name}</h4>
                        {filter.children.map(
                            (innerFilter: { name: string }, index: number) => (
                                <label
                                    key={index}
                                    className={style.container_checkbox}
                                >
                                    {innerFilter.name}
                                    <input
                                        type="checkbox"
                                        name="name"
                                        value={innerFilter.name}
                                        onChange={onChange}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            )
                        )}
                    </div>
                )
            )}
        </>
    );
}

export default function FilterComponent({
    onChange,
    categories,
}: {
    onChange?: (e: any) => void | undefined;
    categories?: any;
}) {
    return (
        <div>
            <Filters onChange={onChange} categories={categories} />
        </div>
    );
}