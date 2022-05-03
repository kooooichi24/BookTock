import dotenv from "dotenv"

const result = dotenv.config({
  path: `env/.env.${process.env.STAGE}`
})

if (result.error) {
  throw result.error
}