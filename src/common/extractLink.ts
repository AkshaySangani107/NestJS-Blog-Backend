export function extractLink(html: string) {
  const regex = /<img[^>]*src=["']([^"']*)["'][^>]*>/gi;
  const matches = html.match(regex);
  console.log('Using match():', matches);
  return matches;

}
