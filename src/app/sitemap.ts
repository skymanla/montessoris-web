import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { getDictionary } from "@/lib/dictionaries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://montessoris.net";
  const posts = getSortedPostsData();
  const dict = getDictionary("ko");

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/montessori", priority: 0.8 },
    { path: "/programs", priority: 0.8 },
    { path: "/benefits", priority: 0.8 },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency || ("monthly" as const),
    priority: route.priority,
  }));

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const benefitRoutes = dict.benefits.items.map((item) => ({
    url: `${baseUrl}/benefits/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...benefitRoutes, ...blogPosts];
}
