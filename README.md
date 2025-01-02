
# Webudvikling bachelor project - Frigo
This project is the app backend part of the bachelor project developed by Asger Thorsboe Lundblad in collaboration with the firm Pentia.
Frigo is an app developed to internal use and its purpose is to purchase small products from the fridge at Pentias workplace.
The app doesn't do any direct transactions, instead it stores the purchases in the database so Pentia at a later time can subtract the amount from their workers payslips.

This repository only contains the backend used by the app. To run test the app part run this code in this [repository](https://github.com/KatlaTL/Frigo_app)

## Table of Contents

<ol>
    <li>
        <a href="#tech-stack">Tech Stack</a>
    </li>
    <li>
        <a href="#run-the-project">Run the project</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#deployment">Deployment</a></li>
        </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
</ol>
<br />


## Tech Stack
The backend is developed in NextJS using App Router and Prisma ORM to connect to a MySQL database. \
The app are developed in React Native (without Expo) and Typescript. [The app part of the project](https://github.com/KatlaTL/Frigo_app)

## Run the project
Follow these steps to run the backend

### Prerequisites
Before running the app make sure you have following setup and installed:
- Install MySql. For mac [homebrew](https://formulae.brew.sh/formula/mysql) can be used

### Deployment
1. Clone the repository
    ```
    git clone https://github.com/KatlaTL/Frigo_backend.git
    ```
2. Change the working directory to the project:
    ```
    cd Frigo_backend
    ```
3. Install dependencies:
    * NPM:
    ```
    npm install
    ```
    * Yarn:
    ```
    yarn install
    ```
4. Create a copy of the .env.example and rename it to .env:
   - Update the DATABASE_URL with your MySQL connection string
   - Add token credentials. This can be auto generated strings
5. Migrate and seed the database:
   - use db:reset to reset and re-migrate and seed the database
    * NPM
    ```
    npm run db:migrate:seed
    ```
    * Yarn
    ```
    yarn run db:migrate:seed
    ````
7. Run the application:
    * NPM
    ```
    npm run start
    ```
    * Yarn
    ```
    yarn run start
    ````

<p align="right">(<a href="#Webudvikling-bachelor-project---Frigo">back to top</a>)</p>

## Project Structure
NextJS requires some specific directories and structure such as the app directory and a middleware.ts file at the top level of the src directory. \
The project structure for the Frigo backend is organized as following:
```
├── prisma
│   ├── migrations
│   │   ├── 20241106135141_frigo_db
│   │   │   └── migration.sql
│   │   ├── 20241118121615_frigo_db
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   ├── seed-products.json
│   └── seed.ts
├── src
    ├── app
    │   └── api
    │       └── v1
    │           └── app
    │               ├── auth
    │               │   ├── refresh-token
    │               │   │   └── route.ts
    │               │   ├── register
    │               │   │   └── route.ts
    │               │   ├── sign-in
    │               │   │   └── route.ts
    │               │   └── sign-out
    │               │       └── route.ts
    │               └── protected
    │                   ├── products
    │                   │   └── route.ts
    │                   └── users
    │                       └── [userId]
    │                           ├── categories
    │                           │   └── products
    │                           │       └── route.ts
    │                           ├── favorites
    │                           │   ├── [productId]
    │                           │   │   └── route.ts
    │                           │   └── route.ts
    │                           └── purchases
    │                               └── route.ts
    ├── constants
    │   └── api.ts
    ├── lib
    │   ├── auth
    │   │   ├── hash.ts
    │   │   └── tokens.ts
    │   ├── imageProcessing.ts
    │   └── prisma.ts
    ├── middleware.ts
    ├── repositories
    │   ├── categoryRepository.ts
    │   ├── productRepository.ts
    │   ├── purchaseRepository.ts
    │   └── userRepository.ts
    ├── services
    │   ├── categoryService.ts
    │   ├── favoriteService.ts
    │   ├── purchaseService.ts
    │   ├── types.ts
    │   └── userService.ts
    └── utils
        ├── error
        │   └── UnauthorizedError.ts
        └── validation
            ├── validateAuthParams.ts
            ├── validateCategoriesProductsParams.ts
            ├── validateFavoriteParams.ts
            ├── validateProductFormData.ts
            ├── validatePurchaseParams.ts
            └── validateTokenParams.ts
```

1. **`prisma` Top level Directory** This is directory for the prisma migration and seed files
    - **`migrations`** Migrations in Prisma is a systematic way to evolve the database schema over time in a version-controlled manner. That is why there are multiple migrations.
2. **`src` Top level Directory**
   - **`app` Directory** This is the directory used in NextJS app router to create API routes
   - **`constants` Directory** Contains files with constants like status codes
   - **`lib` Directory** Contains internal libraries that are packaged and provide general-purpose functionality, such as token management
   - **`middleware` File** Handles all middlewares in NextJS
   - **`repositories` Directory** Contains all database related functions, this is the directory where Prisma communicates with the database
   - **`services` Directory** Contains all business and data transformation logic
   - **`utils` Directory** Contains simple helper functions or utilities such as validation

<p align="right">(<a href="#Webudvikling-bachelor-project---Frigo">back to top</a>)</p>
