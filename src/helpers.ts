export const generateSlug = (link: string) => {
  return link.split(' ').join('-').toLowerCase();
};

export const ungenerateSlug = (link: string) => {
  return link.split('-').join(' ');
};

export const generateName = (email: string) => {
  const index = email.indexOf('@');

  return email.slice(0, index);
};

export const shortenDescription = (description: string, count: number) => {
  return description.slice(0, count) + '...';
};

export const setLocalWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl,
  }

  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalWithExpiry = (key: string) => {
  const now = new Date().getTime();
  const itemStr = localStorage.getItem(key);

  if (!itemStr) return '';

  const item = JSON.parse(itemStr);
  const expired = now > item?.expiry;

  if (expired) {
    localStorage.removeItem(key);
  }

  return expired ? '' : item;
}

export interface CardSettings {
  isGrid?: boolean;
  bgColor: string;
  hasButton: boolean;
}

// Context

export const profileImages = [1, 2, 3, 4, 5];

export const sectionContext = [
  {
    title: 'Who we are',
    text: `We're a small team of developers who wanted to work on something cool through and through. Learning another language is quite a complex topic, but let’s think of it as collecting a puzzle - every new word, grammar structure, pronunciation example, and you have a solid image of what is going on. Remember how you learned to talk as a kid? You took baby steps, picked up new words, and now you're fluent. Here, you'll do something like that.`,
  },
  {
    title: 'What we do',
    text: `As a non-profitable start-up, we wanted to make this useful and fun. Ever thought that looking for learning resources was long and frustrating? Well, we collected it all here and made a summary to make your sailing smoother! Delve right into the most popular grammar topics, interesting videos and any other cool stuff we’ve got in store.`,
  },
];

export const pageCardContext = [
  {
    page: 'grammar',
    title:
      'What the heck is gerund and why are there “though”, “through”, and “thorough”?',
    text: 'Yep, the English grammar is one piece of art. If you ever had any issues with it or just want to deepen your knowledge, well, this section is all set for you, learner.',
  },
  {
    page: 'video',
    title: `Y'know, I think 'm pretty good at English, but when it comes to speaking, I feel like a flop.`,
    text: `Friend... not, learner, in this section you can practice both your listening and speaking. “It's just videos tho”. Hey, check first, critisize later!`,
  },
  {
    page: 'resources',
    title: `Just when I think I've got English down, I hit another weird rule. Where's the cheat sheet for this?`,
    text: `We've got all the 'good good's' here: links to articles, videos, guides, books, and more. It might seem a lot, but take a peek—you'll find something useful.`,
  },
];

export const contributorsContext = [
  {
    role: 'designer',
    name: 'Nataliia Yasnohorska',
    link: 'https://www.behance.net/nataliayasnoho',
  },
  {
    role: 'frontend',
    name: 'Yehor Feshchenko',
    link: 'https://yehorf21.github.io/Portfolio/',
  },
  {
    role: 'backend',
    name: 'Ivan Bakhmet',
    link: 'https://github.com/BakhmetIvan',
  },
];

export const authText = {
  login: 'Happy you are back!',
  signup: `Guess what? We're not here to flood your inbox with annoying newsletters. Nope, that's not our style. Instead, why not create your own account and stash all the cool, useful stuff you find? So, go ahead, sign up, and start saving those gems!`,
};

export const profilePopUp = [
  {
    icon: 'user',
    title: 'My Profile',
    href: '/profile',
  },
  {
    icon: 'like',
    title: 'Liked',
    href: '/liked',
  },
  {
    icon: 'post-filled',
    title: 'Posted',
    href: '/posted',
  },
];

export const notFoundPageData = {
  inDevelopment: {
    text: `Looks like you’ve ventured into an area that’s still under construction. But don’t worry, we’re building something amazing here! Check back soon to see the final masterpiece.`,
    image: 'inDevelopment',
  },
  nonExistent: {
    text: `Looks like you got lost in the depths of our site. Don't worry, we'll find the way out together!`,
    image: 'notFound',
  },
  notLoggedIn: {
    text: `Looks like you haven't logged in yet. This content will be available after!`,
    image: 'inDevelopment',
  },
  noFavorites: {
    text: 'Looks like you did not add anything here yet. Go to our pages and explore!',
    image: 'inDevelopment',
  }
};

export const profilePagesContext = [
  {
    img: 'images/liked.png',
    title: 'Liked',
    icon: 'like-added',
  },
  {
    img: 'images/posted.png',
    title: 'Posted',
    icon: 'post-filled',
  },
];