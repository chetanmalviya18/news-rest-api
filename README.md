# News Web App API

The News Web App API is a robust and scalable solution built using Node.js, Express, PostgreSQL, and Prisma ORM. It efficiently handles news data with optimized database interactions, while Redis is integrated for caching, ensuring fast response times. The API includes rate limiting for enhanced security, preventing abuse, and incorporates comprehensive logging for better tracking and debugging. This API is designed to serve as the backend for news aggregation platforms, offering high-performance, reliable news delivery to users.

## Authors

- [@chetanmalviya18](https://www.github.com/octokatherine)

## API Reference

### AUTH

##### Register

```http
  POST /api/auth/register
```

| Body                    | Type       | Description                         |
| :---------------------- | :--------- | :---------------------------------- |
| `name`                  | `name`     | **Required**. Your Name             |
| `email`                 | `email`    | **Required**. Your Email            |
| `password`              | `password` | **Required**. Your Password         |
| `password_confirmation` | `password` | **Required**. Your Confrim Password |

##### Login

```http
  POST /api/auth/login
```

| Body       | Type       | Description                 |
| :--------- | :--------- | :-------------------------- |
| `email`    | `email`    | **Required**. Your Email    |
| `password` | `password` | **Required**. Your Password |

It will return an token for further authentication.

### PROFILE

##### Get Profile

```http
  GET /api/profile
```

| Headers                            | Description                   |
| :--------------------------------- | :---------------------------- |
| `key: Authorization, value: token` | **Required**. Generated Token |

##### Update Profile

```http
  PUT /api/profile/:id
```

| Headers                            | Description                   |
| :--------------------------------- | :---------------------------- |
| `key: Authorization, value: token` | **Required**. Generated Token |

### News Manipulation

##### Add News

```http
  POST /api/news
```

| Headers                            | Description                   |
| :--------------------------------- | :---------------------------- |
| `key: Authorization, value: token` | **Required**. Generated Token |

| Body      | Type     | Description   |
| :-------- | :------- | :------------ |
| `title`   | `string` | **Required**. |
| `content` | `string` | **Required**. |
| `image`   | `file`   | **Required**. |

##### Get all News

```http
  GET /api/news
```

##### Get News by id

```http
  GET /api/news/:id
```

##### Update News

```http
  PUT /api/news/:id
```

| Headers                            | Description                   |
| :--------------------------------- | :---------------------------- |
| `key: Authorization, value: token` | **Required**. Generated Token |

##### Delete News

```http
  DELETE /api/news/:id
```

| Headers                            | Description                   |
| :--------------------------------- | :---------------------------- |
| `key: Authorization, value: token` | **Required**. Generated Token |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`APP_URL`
`JWT_SECRET`
`DATABASE_URL`

`SMTP_PASSWORD`
`SMTP_HOST`
`SMTP_PORT`
`SMTP_USER`
`FROM_EMAIL`

`REDIS_PORT`
`REDIS_HOST`
`REDIS_PREFIX`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd news-rest-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
