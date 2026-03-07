// sanity/schemas/project.ts

// Вспомогательный объект для строк
const localeString = {
  type: 'object',
  fieldsets: [{ name: 'translations', title: 'Переводы' }],
  fields: [
    { title: 'English', name: 'en', type: 'string', fieldset: 'translations' },
    { title: 'Deutsch', name: 'de', type: 'string', fieldset: 'translations' },
  ],
}

// Вспомогательный объект для Rich Text (описаний)
const localeBlock = {
  type: 'object',
  fieldsets: [{ name: 'translations', title: 'Переводы' }],
  fields: [
    { title: 'English', name: 'en', type: 'array', of: [{ type: 'block' }], fieldset: 'translations' },
    { title: 'Deutsch', name: 'de', type: 'array', of: [{ type: 'block' }], fieldset: 'translations' },
  ],
}

export default {
  name: 'project',
  title: 'Проекты',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок 1 (Основной)',
      ...localeString, // Теперь тут EN и DE
    },
    {
      name: 'slug',
      title: 'URL проекта',
      type: 'slug',
      options: { 
        source: 'title.en', // Генерим ссылку из английского названия
      },
    },
    {
      name: 'mainImage',
      title: 'Главная картинка (Hero | 2 : 1)',
      type: 'image',
      options: { hotspot: true },
    },
    {
       name: 'mainImageForPhones',
      title: 'Главная картинка для телефонов(Hero | 1 : 2)',
      type: 'image',
      options: { hotspot: true },

    },
    {
      name: 'cardImage',
      title: 'Картинка для карточки (2 : 1)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'title2',
      title: 'Заголовок 2',
      ...localeString,
    },
    {
      name: 'tags',
      title: 'Теги проделанной работы',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'object', title: 'Название', 
              fields: [
                { name: 'en', type: 'string', title: 'EN' },
                { name: 'de', type: 'string', title: 'DE' }
              ] 
            },
            { name: 'link', type: 'url', title: 'Ссылка (необязательно)' },
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Основное описание',
      ...localeBlock,
    },
    {
      name: 'description2',
      title: 'Мини-описание (Описание 2)',
      ...localeBlock,
    },
    {
      name: 'youtubeUrl',
      title: 'Ссылка на YouTube',
      type: 'url',
    },
    {
      name: 'client',
      title: 'Клиент',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Год услуги',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Локация',
      ...localeString,
    },
    {
      name: 'services',
      title: 'Услуги (для страницы проекта)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' }
          ]
        }
      ],
    },
    {
      name: 'gallery',
      title: 'Галерея картинок (2 квадратных -> 1 широкая -> повторить',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'accentColor',
      title: 'Акцентный цвет',
      type: 'string',
    },
  ],
}