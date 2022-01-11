import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "../pages/api/lib/sanity";

export default function AbsoluteURLsForSanity(source) {
  const builder = imageUrlBuilder(sanity);
  return builder.image(source);
}
