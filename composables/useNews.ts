import { apiPlugin } from '@storyblok/js';

export function useNews() {
  const storyblokApi = useStoryblokApi();

  async function fetchAllNews() {
    try {
      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'aktuellt',
        is_startpage: 0,
      });

      const stories = data.stories;
      return stories;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchNewsBySlug(slug: string) {
    try {
      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'aktuellt',
        by_slugs: '*/' + slug,
        is_startpage: 0,
      });

      const story = data.stories[0];
      return story;

      console.log(data.stories);
    } catch (error) {
      console.log(error);
    }
  }

  return { fetchAllNews, fetchNewsBySlug };
}
