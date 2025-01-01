
# Webudvikling bachelor project - Frigo
This project is the app backend part of the bachelor project developed by Asger Thorsboe Lundblad in collaboration with the firm Pentia.
Frigo is an app developed to internal use and its purpose is to purchase small products from the fridge at Pentias workplace.
The app doesn't do any direct transactions, instead it stores the purchases in the database so Pentia at a later time can subtract the amount from their workers payslips.

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
The backend is developed in NextJS using App Router and Prisma to connect to a MySQL database. \
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
The project structure for the Pentia Mobile Chat app is organized as following:
```

```

1. **`App.tsx` File** This is the root file of the app with all the different providers
2. **`assets` Directory** for all assets, fonts and styles
    - **`fonts`** Contains the fonts used
    - **`img`** Contains images and icons
    - **`styles`** Contains global styles
3. **`components` Directory** contains all global components used across the app
4. **`constants.tsx` File** This file contains all contant values used in the app
5. **`contexts` Directory** for contexts files
6. **`hooks` Directory** for custom hooks
7. **`navigators` Directory** for the apps navigators: Root navigator, App navigator, Auth navigator and Carousel top bar navigator
8. **`screens` Directory** for the different screens used across the app
    - **`history`** History screen
        - **`_components`** Components used in the history screen
    - **`products`** Products and favorite screen
        - **`_components`** Components used in the products and favorite screen
        - **`_strategies`** Strategies to use if it's the  products or favorite screen
    - **`settings`** Settings in screen
    - **`signin`** Sign in screen
        - **`_components`** Components used in the sign in screen
    - **`splash`** Splash screen
9. **`services`Directory** for all services files, used to do HTTP request to the backends API
10. **`utils` Directory** for all files containing utility functions

<p align="right">(<a href="#Webudvikling-bachelor-project---Frigo">back to top</a>)</p>







#Prerequisite 
MySql should be installed on your Mac, homebrew can be used:<br/>
https://formulae.brew.sh/formula/mysql 

#Next.js
The admin panel has been implemented using Next.js App Router which can be read more about through the following link:<br/>
https://nextjs.org/docs/app 

#Project structure
Below is an example of a project structure which has been used as inspiration for structuring the code. The structure below uses Domain-Driven Design (DDD).

your-nextjs-app/
```
├── prisma/                     # Prisma schema and seed data
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── app/                    # App Router pages and API routes
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── route.ts    # API route for users
│   │   ├── page.tsx
│   │   
│   │   
│   │
│   ├── components/             # Reusable components for UI
│   │   ├── Button.tsx
│   │   ├── Navbar.tsx
│   │   └── Table.tsx
│   │
│   ├── lib/                    # Shared libraries, helpers, and configuration
│   │   ├── prisma.ts           # Prisma client instance
│   │   └── utils.ts            # Helper functions
│   │
│   ├── repositories/           # Database access layer (DAL) for Prisma models
│   │   ├── userRepository.ts   # User-specific database functions
│   │   └── productRepository.ts
│   │
│   └── services/               # Business logic layer. Used to handle the data from the database for the admin panel and the app separately
│       ├── userService.ts      # User-related business logic
│       └── productService.ts
│
├── .env                        # Environment variables
├── next.config.js              # Next.js configuration
└── package.json
```

#Prisma
The Prisma folder contains migrations and the prisma schema. Prisma is an ORM and makes it possible to work and interact with the database, in this case a MySql database. 

##Migrations
Migrations in Prisma is a systematic way to evolve the database schema over time in a version-controlled manner. That is why there are multiple migrations.

##schema.prisma
The Prisma schema makes it possible to define the application models. In this case these models have been defined based on the ER-diagram portrayed in the wiki.

##seed.ts
The seed file contains data that can be put into the database in order to test if the database works. 

##How it was setup
The following guide was used to setup Prisma:<br/>
https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql 

##Prisma commands
The package.json file contains some Prisma scripts that can be executed through the terminal, that is:
- ```npx prisma migrate dev``` creates or applies migrations to the database based on the current schema
- ```npx prisma db push``` synchronizes the Prisma schema with the database without generating migrations in it
- ```npx prisma db seed``` runs a seeding script to populate the database with test data
- ```npx prisma migrate reset && npm run db:migrate && npm run db:seed``` resets the database and reinitialize it

#Tailwind
Tailwind CSS had been used to style the elements and components of the admin panel.<br/>
Custom colors can be customized through the ```tailwind.config.js``` file where some customized colors have already been defined.

#Public folder
Next.js can serve static files like images under a folder called ```public``` in the root directory. You can read more about it here:<br/>
https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets

The public folder only contains svg images from the Figma files that are used by the admin panel.
