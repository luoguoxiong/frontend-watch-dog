# tegg app

[Hacker News](https://news.ycombinator.com/) showcase using [tegg](https://github.com/eggjs/tegg)

## QuickStart

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
npm run tsc
npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js >= 16.x
- Typescript >= 4.x

### 
```shell
# 创建表
npx sequelize migration:generate --name=init-users

npx sequelize db:migrate

npx sequelize db:migrate:undo
# 修改表
npx sequelize-cli seed:generate --name user

npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:all:undo
```
