import Image from "next/image";
import style from "../styles/about.module.css";
import Main from "../containers/Main/Main";
import { useContentfulCMS } from "../contexts/ContentfulContext";
import sky from "../public/assets/sky-cashmere.svg";
import caminatta from "../public/assets/caminatta.svg";
import atlanta from "../public/assets/atlanta_mocassin.svg";
import moda from "../public/assets/moda_ana.svg";
import love from "../public/assets/love_m.svg";

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
            <Image
              src={`https:${heroImage.fields.file.url}`}
              width={1000}
              height={300}
              alt="muralhas"
            />
            <h1>{title}</h1>
          </header>
          <article>
            <section className={style.introduction}>
              {introduction.content.map(({ content }: { content?: any }) => (
                <p key={content[0].value}>{content[0].value}</p>
              ))}
            </section>
            <section className={style.whyVisitUs}>
              <Image
                src={`https:${secondSectionImage.fields.file.url}`}
                width={1000}
                height={300}
                alt="background-image"
              />
              <div>
                <h2>{whyVisitUs.content[0].content[0].value}</h2>
                <ul>
                  {whyVisitUs.content[1].content.map(
                    (content: any, index: any) => (
                      <li key={index}>{content.content[0].content[0].value}</li>
                    )
                  )}
                </ul>
              </div>
            </section>
            <section className={style.brands}>
              <Image src={sky} alt="vera" />
              <Image src={caminatta} alt="caminatta" />
              <Image src={atlanta} alt="atlanta-mocassin" />
              <Image src={moda} alt="moda-ana" />
              <Image src={love} alt="love-m" />
            </section>
            <section>
              <h1>{lastSectionTitle}</h1>
              <div className={style.storeImages}>
                {storeImages.map(
                  ({ fields, title }: { fields?: any; title?: any }) => (
                    <Image
                      key={fields.title}
                      src={`https:${fields.file.url}`}
                      width={285}
                      height={350}
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
