import { apiPlugin } from '@storyblok/js';

export function useBlogs() {
  const storyblokApi = useStoryblokApi();

  async function fetchAllBlogs() {
    try {
      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'bloggar',
        is_startpage: 0,
      });

      const stories = data.stories;
      return stories;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBlogBySlug(slug: string) {
    try {
      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'bloggar',
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

  return { fetchAllBlogs, fetchBlogBySlug };
}
