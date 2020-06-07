# Установка

1. Перенести содержимое директории server в директорию сервер в vn-cms
2. Перенести содержимое директории manager в директорию manager_dev в vn-cms
3. В файле `manager_dev/src/core/config/index.js` в массив modules добавить следующий объект

```js
{
  slug: 'shop',
  name: 'Shop',
  lexicon: 'shop',
  path: '/shop'
}
```
