export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Blog Post: {params.slug}</h1>
      <p className="text-gray-600 dark:text-gray-400">
        This is a placeholder for the blog post content.
      </p>
    </div>
  );
}
