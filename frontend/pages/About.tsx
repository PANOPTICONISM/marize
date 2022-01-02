import style from "./about.module.css";
import Main from "../containers/Main/Main";
import { useContentfulCMS } from "../contexts/ContentfulContext";
import sky from "../../assets/sky-cashmere.svg";
import caminatta from "../../assets/caminatta.svg";
import atlanta from "../../assets/atlanta_mocassin.svg";
import moda from "../../assets/moda_ana.svg";
import love from "../../assets/love_m.svg";

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

    return (
        <Main>
            {aboutPage ? (
                <div className={style.aboutPage}>
                    <header>
                        <img src={heroImage.fields.file.url} alt="" />
                        <h1>{title}</h1>
                    </header>
                    <article>
                        <section className={style.introduction}>
                            {introduction.content.map(
                                ({ content }: { content?: any }) => (
                                    <p key={content[0].value}>
                                        {content[0].value}
                                    </p>
                                )
                            )}
                        </section>
                        <section className={style.whyVisitUs}>
                            <img
                                src={secondSectionImage.fields.file.url}
                                alt=""
                            />
                            <div>
                                <h2>
                                    {whyVisitUs.content[0].content[0].value}
                                </h2>
                                <ul>
                                    {whyVisitUs.content[1].content.map(
                                        (content: any, index: any) => (
                                            <li key={index}>
                                                {
                                                    content.content[0]
                                                        .content[0].value
                                                }
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </section>
                        <section className={style.brands}>
                            <img src={sky} alt="vera" />
                            <img src={caminatta} alt="caminatta" />
                            <img src={atlanta} alt="atlanta-mocassin" />
                            <img src={moda} alt="moda-ana" />
                            <img src={love} alt="love-m" />
                        </section>
                        <section>
                            <h1>{lastSectionTitle}</h1>
                            <div className={style.storeImages}>
                                {storeImages.map(
                                    ({
                                        fields,
                                        title,
                                    }: {
                                        fields?: any;
                                        title?: any;
                                    }) => (
                                        <img
                                            key={fields.title}
                                            src={fields.file.url}
                                            alt={fields.title}
                                        />
                                    )
                                )}
                            </div>
                        </section>
                    </article>
                </div>
            ) : null}
        </Main>
    );
}
