# CoinSentry'sApi

Api of project [CoinSentry](https://github.com/rogigs/CoinSentry)

## Authors

- [@rogigs](https://www.github.com/rogigs)

## Run Locally

Clone the project

```bash
 git@github.com:rogigs/api-coin-sentry.git
```

Go to the project directory

```bash
  cd api-coin-sentry
```

Install dependencies

```bash
  npm install -g nodemon && npm install
```

Start project

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
  PGHOST='your-host'
  PGDATABASE='your-database'
  PGUSER='your-user'
  PGPASSWORD='your-password'
```

## Generate documentation

To generate documentation run the following command

```bash
  npm run docs
```

## Roadmap

1. Add routes ✅
2. Add ORM
3. Add documentation of API(Swagger)
4. Add tests
