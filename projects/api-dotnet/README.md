# API (in dotnet)

This is an API built using [Entity Framework]() as an ORM to manage a simple database in Mongo DB.

It uses a hardcoded username for a single user, but could easily be expanded for multi-user/tenant systems. The authentication to manage content is based on Otp.NET package. There are no passwords, and you can only login if you are the creator of this application.

## Running the app

- `docker compose up` - starts the Mongo DB locally
- `export MONGODB_URI=mongodb://root:example@localhost:27017`
- `dotnet watch run`

## Deploying

TBD, using `azd`
