import * as yaml from "js-yaml";

export function extractFrontmatter(content: string): any {
  const frontmatterRegEx = /---\n([\s\S]*?)\n---/;
  const match = frontmatterRegEx.exec(content);
  if (!match) return null;
  const yamlString = match[1];
  try {
    const yamlObject = yaml.load(yamlString);
    return yamlObject;
  } catch (e) {
    console.error("Error parsing YAML frontmatter:", e);
    return null;
  }
}

export function hasMatchingTag(frontmatter: any, tags: string[]): boolean {
  if (!frontmatter || !frontmatter.tags) return false;
  return frontmatter.tags.some((tag: string) => tags.includes(tag));
}
