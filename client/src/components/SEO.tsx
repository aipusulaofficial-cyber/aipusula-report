
import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  keywords?: string;
  type?: "website" | "article";
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

export default function SEO({
  title,
  description,
  canonical,
  image = "https://aipusula.net/og-image.png",
  keywords =
    "AIPUSULA, yapay zekâ, AI, ChatGPT, Gemini, Claude, siber güvenlik, teknoloji",
  type = "website",
  noindex = false,
  breadcrumbs = [{ name: "Ana Sayfa", url: "https://aipusula.net/" }],
  article,
}: SEOProps) {
  const organization = {
    "@type": "Organization",
    "@id": "https://aipusula.net/#organization",
    name: "AIPUSULA",
    url: "https://aipusula.net",
    logo: "https://aipusula.net/og-image.png",
  };
  const website = {
    "@type": "WebSite",
    "@id": "https://aipusula.net/#website",
    name: "AIPUSULA",
    url: "https://aipusula.net",
    inLanguage: "tr-TR",
    publisher: { "@id": "https://aipusula.net/#organization" },
  };
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
  const pageSchema = {
    "@type": type === "article" ? "Article" : "WebPage",
    "@id": `${canonical}#${type === "article" ? "article" : "webpage"}`,
    name: title,
    headline: type === "article" ? title : undefined,
    description,
    url: canonical,
    isPartOf: { "@id": "https://aipusula.net/#website" },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    publisher: { "@id": "https://aipusula.net/#organization" },
    image: image,
    ...(article && {
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      author: { "@type": "Organization", name: article.author || "AIPUSULA" },
    }),
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      { ...breadcrumbList, "@id": `${canonical}#breadcrumb` },
      pageSchema,
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="AIPUSULA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      {type === "article" && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {type === "article" && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}