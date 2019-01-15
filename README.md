# Adonis calendar api

Calendar api with user management

## Users api

´POST - /users´ - Creates a new user
Params:

```
{
	"name": "" // User name - required,
	"email": "" // User email - required, must be an email and unique in database,
	"password": "" // User password - required,
	"password_confirmation": "" // User password confirmation - required and must the same as password
}
```
