// structure to store database access information.
// By changing the different values the API can connect to another database
/*
host: url of the database
user: database admin username
password: database admin password
port: port where the database is served
database: name of the database
*/
let databaseCredentials = {
  host: "c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "fojzxpagjvm2bx1h",
  password: "awsxreisc23vnnkr",
  port: 3306,
  database: "m9orw0iklm9r1cjx",
};

module.exports.databaseCredentials = databaseCredentials;
