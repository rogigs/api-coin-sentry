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
  TYPEORM_USERNAME='your-username'
  TYPEORM_PASSWORD='your-password'
  TYPEORM_DATABASE='your-database'
  TYPEORM_HOST='your-host'

  SENTRY_DSN_PUBLIC_KEY='your-dsn'
  SENTRY_PROJECT_ID='your-project-id'
  SENTRY_ORG_SLUG='your-org-slug'

  CLIENT_LOCAL='your-address-local'
  CLIENT_QA='your-address-qa'
  CLIENT_PROD='your-address-prod'

  JWT_ACCESS_TOKEN_PUBLIC_KEY='your-token'
```

## Generate documentation

To generate documentation run the following command

```bash
  npm run docs
```
