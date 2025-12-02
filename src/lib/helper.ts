/**
 * Returns the content without the extension.
 */
export function removeContentExtension(content: string): string {
  return content.replace(/\.mdx$/, "");
}

/**
 * Returns an array of unique tags from the contents.
 */
export function getTags(contents: { tags: string }[]): string[] {
  const validTags = contents.flatMap(({ tags }) => {
    if (typeof tags !== 'string') return [];
    return tags.split(',').map((tag) => tag.trim());
  });

  const uniqueTags = Array.from(new Set(validTags));

  return uniqueTags;
}

/**
 * Returns a boolean value indicating whether the target text includes the filter text.
 */
export function textIncludes(target: string, filter: string): boolean {
  const [newTarget, newFilter] = [target, filter].map((text) =>
    text.replace(/\W/g, '').toLowerCase()
  );
  return newTarget.includes(newFilter);
}
