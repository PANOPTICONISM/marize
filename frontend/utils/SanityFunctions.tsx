import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "../pages/api/lib/sanity";

export function absoluteURLsForSanity(source) {
  const builder = imageUrlBuilder(sanity);
  return builder.image(source);
}

export function styleSanityBlocks(blocks) {
  return blocks.map(
    (block: { listItem: string; children: any[]; style: string }) => {
      if (block.listItem === "bullet") {
        return block.children.map((paragraph, index) => (
          <li key={index}>{paragraph.text}</li>
        ));
      }
      if (block.style === "h2") {
        return block.children.map((paragraph, index) => (
          <h2 key={index}>{paragraph.text}</h2>
        ));
      }
      return block.children.map((paragraph, index) => (
        <p key={index}>{paragraph.text}</p>
      ));
    }
  );
}
