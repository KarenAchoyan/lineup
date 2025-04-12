import 'server-only'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    hy: () => import('@/dictionaries/hy.json').then((module) => module.default),
    ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
    ge: () => import('@/dictionaries/ge.json').then((module) => module.default),
}


export const getDictionary = async (locale) => {
    const loader = dictionaries[locale] || dictionaries.hy;
    return loader();
}

