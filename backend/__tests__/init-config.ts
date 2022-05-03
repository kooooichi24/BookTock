process.env = {
  ...process.env,
  SERVICE: "booktock-backend",
  STAGE:  "test"
}

import dotenv from "dotenv"

const result = dotenv.config({
  path: `env/.env.${process.env.STAGE}`
})

if (result.error) {
  throw result.error
}