# Strapi Markdown Blog

This is a blog starter project that uses the Strapi Rich Text Data Type and react-markdown to render the content.

## **Steps to create a new project like this**

### Setup NVM

> This version of Strapi needs a specific version of Node. We recommend using NVM to manage your Node versions.
>
> Follow these instructions to install NVM if you don't have it already: [nvm installation instructions](https://github.com/nvm-sh/nvm)

- create a new `.nvmrc` file in the root of your project and add the following line:

```bash
v18.13.0
```

- run the following command to install the correct version of Node:

```bash
nvm install
```

- run the following command to use the correct version of Node:

```bash
nvm use
```

## Install the backend

### Create a new Strapi project

> Note: The Strapi project will be the backend of this project

- run the following command to create a new Strapi project:

```bash
npx create-strapi-app backend  --quickstart
```

- after the project is created, strapi will open the browser and prompt you to create an admin user. Create the user.

- create **collection types, fields, content and permissions** as you see fit (don't forget to give permission to the public role to read the content)

### Run Strapi in development mode

- `cd` into the `backend` folder
- run the following command to start Strapi in development mode:

```bash
npm run develop
```

NOTE: If you get an error like this:

```bash
Error: The module ... was compiled against a different Node.js version using
NODE_MODULE_VERSION 108. This version of Node.js requires
NODE_MODULE_VERSION 111. Please try re-compiling or re-installing
the module ...
```

- delete the `node_modules` folder in the `backend` folder
- run `npm install` again
- run `npm run develop` again

> Login to the strapi admin panel

## Install the frontend

### Create a new Next.js project

- `cd` back into the root of the project
- run the following command to create a new Next.js project as the frontend:

```bash
npx create-next-app frontend
```

> remove Next.js boilerplate

#### Copy the following frontend code from this repo into the `frontend` folder:

- `config/server.ts`
- `pages/index.tsx`
- `pages/posts/[slug].tsx`
- `pages/_app.tsx`
- `styles/globals.css`
- `types.ts`

## **IMPORTANT**

### If you want to use slug instead of id in the url

- open `backend/src/api/post/controllers/post.js`
- replace `module.exports = createCoreController('api::post.post');` with the following code:

```js
module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params
    const entity = await strapi.db.query('api::post.post').findOne({
      where: { slug: id },
    })
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

    return this.transformResponse(sanitizedEntity)
  },
}))
```

## Add react-markdown
