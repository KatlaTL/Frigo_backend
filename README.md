
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