import { router, Href } from 'expo-router';

export const Router = {
  push: (href: string | object) => {
    router.push(href as Href);
  },
  navigate: (href: string | object) => {
    router.navigate(href as Href);
  },
  replace: (href: string | object) => {
    router.replace(href as Href);
  },
  back: () => {
    router.back();
  },
};
