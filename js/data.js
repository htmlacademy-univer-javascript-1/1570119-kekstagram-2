import {
  generateUniqueId,
  getRandomElementOfArr,
  getRandomInt
} from './utils.js';

const NAMES = [
  'Лосяш',
  'Крош',
  'Нюша',
  'Кар-Карыч',
  'Ёжик',
  'Бараш',
  'Копатыч',
  'Пин',
  'Совунья',
  'Биби'
];
const DESCRIPTION_SENTENCES = [
  'Хорошо бы, чтоб про нас тоже рассказывали много хороших и красивых историй. Пусть каким-нибудь образом это будет их… касаться.',
  'Рецепт хорошего отдыха №1: лечь на травку, раскинуть крылья и лежать, лежать, лежать.',
  'А вдруг окажется, что смысл жизни — не есть сладкого и не спать до двенадцати? Я тогда только расстроюсь...',
  'Я просто выгляжу как лось, а в душе я бабочка.',
  'Я личность! Понятно? Бесформенная, но личность!',
  'Зачем нужна Вселенная, в которой нет чуда?',
  'Настроение — сложная штука. То оно есть, а то его нет.',
  'Укуси меня, пчела...',
  'В кулинарии может не хватать только аппетита',
  'Почему я должен делать вид, что мне хорошо, когда мне в действительности плохо?',
  'Если честно, то в жизни мне повезло лишь однажды: когда я встретил вас — моих друзей.'
];

const COMMENT_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. ',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. ',
  'Как можно было поймать такой неудачный момент?!'
];

const MAX_COMMENTS_PER_POST = 5;

// eslint-disable-next-line arrow-body-style
const createComments = (count) => {
  return Array.from({ length: count }, () => ({
    id: generateUniqueId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomElementOfArr(COMMENT_SENTENCES),
    name: getRandomElementOfArr(NAMES)
  }));
};

const createPost = (id) => ({
  id,
  url: `photos/${id}`,
  description: getRandomElementOfArr(DESCRIPTION_SENTENCES),
  likes: getRandomInt(25, 200),
  comments: createComments(getRandomInt(1, MAX_COMMENTS_PER_POST))
});

const generatePosts = () =>
  Array.from({ length: 25 }, (_, id) => createPost(id + 1));

export { generatePosts };
