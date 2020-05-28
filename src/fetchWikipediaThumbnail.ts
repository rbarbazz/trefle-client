export const fetchWikipediaThumbnail = async (
  plantName: string,
): Promise<string> => {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${plantName}&prop=pageimages&format=json&pithumbsize=200&origin=*`,
  );

  const data = await response.json();
  const pageNumber = Object.keys(data.query.pages)[0];

  if (Number.parseInt(pageNumber) > -1) {
    const thumbnailURL = data.query.pages[pageNumber]?.thumbnail?.source;

    return thumbnailURL || '';
  }

  return '';
};
