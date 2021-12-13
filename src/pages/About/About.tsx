import React from "react";
import Main from "../../containers/Main/Main";
import { useContentfulCMS } from "../../contexts/ContentfulContext";

export default function About() {
    const { aboutPage } = useContentfulCMS();

    const {
        heroImage,
        title,
        introduction,
        secondSectionImage,
        whyVisitUs,
        lastSectionTitle,
        storeImages,
    } = aboutPage !== undefined && aboutPage[0]?.fields;

    console.log(storeImages);
    return (
        <Main>
            {aboutPage ? (
                <>
                    <header>
                        <img src={heroImage.fields.file.url} alt="" />
                        <h1>{title}</h1>
                    </header>
                    <article>
                        <section>
                            <p>{introduction.content[0].content[0].value}</p>
                        </section>
                        <section>
                            <img
                                src={secondSectionImage.fields.file.url}
                                alt=""
                            />
                            <h2>{whyVisitUs.content[0].content[0].value}</h2>
                            <ul>
                                {whyVisitUs.content[1].content.map(
                                    (content: any) => (
                                        <li>
                                            {
                                                content.content[0].content[0]
                                                    .value
                                            }
                                        </li>
                                    )
                                )}
                            </ul>
                        </section>
                        <section>
                            <h1>{lastSectionTitle}</h1>
                            <div>
                                {storeImages.map(
                                    ({ fields }: { fields?: any }) => (
                                        <img
                                            src={fields.file.url}
                                            alt={fields.title}
                                        />
                                    )
                                )}
                            </div>
                        </section>
                    </article>
                </>
            ) : null}
        </Main>
    );
}
