export type SingleProduct = {
  _id: string;
  title: MultileLanguage;
  category: {
    title: MultileLanguage;
    _id: string;
  } | null;
  vendor: { title: string; _id: string };
  slug: string | null;
  body: { en: BodyProps; pt: BodyProps } | null;
  discounted: boolean;
  images: {
    _type: string;
    _key: string;
    asset: { _ref: string; _type: string };
  }[];
  variants: {
    colours: MultileLanguage | null;
    sizes: { _id: string; title: string }[];
  }[];
};

type BodyProps = {
  children: {
    text: string;
    _key: string;
    _type: string;
  };
}[];

type MultileLanguage = {
  en: string;
  pt: string;
  _type: string;
};
