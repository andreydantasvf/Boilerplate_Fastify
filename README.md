![Fastify Boilerplate](https://raw.githubusercontent.com/fastify/graphics/96648545bcad9d1984dd96363a39e2775b59afef/fastify-landscape-outlined.svg)

This is a boilerplate for [Fastify](https://www.fastify.io/), a high-performance web framework for Node.js, intended to serve as a foundation for building scalable web applications.

## What is inside?

This project includes a range of technologies and tools:

- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript for static type checking
- [ESLint](https://eslint.org/) - Linter for identifying and fixing problems in your JavaScript code
- [Prettier](https://prettier.io/) - Code formatter to ensure consistent code style
- [Husky](https://github.com/typicode/husky) - Git hooks to enforce code quality standards
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable loader
- [prisma](https://www.prisma.io/docs) - ORM to work with databases

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/andreydantasvf/boilerplate_Fastify.git
cd boilerplate_Fastify
```

### 2. Install dependencies:

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables:

Create a `.env` file in the root of the project, and add the following environment variables (you may need to modify these values depending on your setup):

```env
DATABASE_URL="mongodb://localhost:27017/boilerplate?replicaSet=rs0"
NODE_ENV='development'
PORT='3333'
JWT_SECRET='mySecret'
JWT_EXPIRATION='1d'
COOKIE_SECRET='mySecret'
```

NOTE: The Prisma ORM not working good with mongoDB

### 4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

You can start editing the API routes by modifying the files in the `src/routes` folder.

## Available Scripts

In the project directory, you can run the following commands:

- `dev`: runs the application in development mode on `localhost:3333`
- `build`: builds the production version of the application
- `start`: starts a simple server with the production build
- `lint`: runs the linter to check for any code issues

## Additional Resources

- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/en/)
