export const seo = (title: string, description: string) => ({
  meta: [
    { title: `${title} | ZEPARI` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | ZEPARI` },
    { property: "og:description", content: description },
  ],
});
