##Rewaa asgn node PART

###Steps to run
- run `npm install`
- Change the config file for mysql DB local values and used port.
- run `npm  start`  to  start
- To add user for testing to login with -> run a `post` call to `http://localhost:4000/users/register` with json body like `
   {
       "username": "rashad",
       "password": "test123"
   }`. 

###Covered
- auth filter for authentication management.
- user and product controllers.
- error handling.
- sequelize to perform ORM.
- Jest unit test

###Missed for time constrain
- API documentation using something like swagger or so.
- Only service files are not covered with unit test.
