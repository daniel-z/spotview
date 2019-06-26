export interface UnsplashImageInterface {
  color: string;
  description: string;
  height: number;
  id: string;
  likes: number;

  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };

  user: {
    link: string;
    name: string;
    width: number;
  };
}

export const InitialUnsplashImageState: UnsplashImageInterface = {
  color: null,
  description: null,
  height: null,
  id: null,
  likes: null,

  urls: {
    full: null,
    raw: null,
    regular: null,
    small: null,
    thumb: null
  },

  user: {
    link: null,
    name: null,
    width: null
  }
};
