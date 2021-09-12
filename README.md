# Cars Manager App
Application for cars data management stored in MongoDb.

## Runing the application
### Docker
please make sure you don't have any other running mongo container
* run ```docker-compose up --build```.
* Wait till build is finished and you see Server Started" and "MongoDB Connected..." in the *cars-api*
 Docker container logs.
* You can run the E2E tests to verify is working: ```npm run test:e2e```.

NOTE: The application will be exposed by default at your localhost in the *PORT: 3000*

## API USAGE

You can import this [postman collection](https://github.com/enriplaso/cars-api/blob/dc51685be514a61070b5153cb9c3efa624a1ed9a/postman/Car-Mangement-API.postman_collection.json)

### How to use
 1. you need to Singn Up in order to create an user.
 2. You need to save  the token after signing up or get a new one by log in.
 3. For the rest of requests you need to pass the token in teh Authentication header.

### API specification

* Sign up: POST */signup*

Creates an new user and returns a valid token
```
curl --location --request POST 'http://localhost:3000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "valid@email.com",
	"password": "somepass"
}'
```

* Login: POST */login*

Validates the user and password and returns a valid token
```
curl --location --request POST 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "valid@email.com",
	"password": "somepass"
}'
```
* Crate a new car: POST  */car*

Will retrun the car serial uuid
```
curl --location --request POST 'http://localhost:3000/car' \
--header 'Content-Type: application/json' \
--header 'Authorization: <TOKEN>' \
--data-raw '{
	"brand": "Ford",
	"color": "Blue",
	"model": "Mustang"
}'
```
* Get a car: GET  */car/:serialUUID*

Returns a Car object given its serial uuid
```
curl --location --request GET 'http://localhost:3000/car/c470253f-d83d-4b1d-8d7c-3686891b3a78' \
--header 'Content-Type: application/json' \
--header 'Authorization: <TOKEN>'
```
Example response:
```
{
    "brand": "Ford",
    "color": "Blue",
    "model": "Mustang",
    "creationDate": "2021-09-12T18:36:36.600Z",
    "serialUUID": "c470253f-d83d-4b1d-8d7c-3686891b3a78"
}
```

* Update a car: PUT  */car/:serialUUID*

Updaes single properties of Car and Returns the updated Car object
```
curl --location --request PUT 'http://localhost:3000/car/c470253f-d83d-4b1d-8d7c-3686891b3a78' \
--header 'Authorization: <TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{"brand": "Porsche"}'
```
* Delete a car: DELETE  */car/:serialUUID*

Removes a car given its serial uuid
```
curl --location --request DELETE 'http://localhost:3000/car/c470253f-d83d-4b1d-8d7c-3686891b3a78' \
--header 'Content-Type: application/json' \
--header 'Authorization: <TOKEN>'
```
* Ger metadata: GET  */car/:serialUUID*

Gets aggregated metadata asociated with the stored cars.
```
curl --location --request GET 'http://localhost:3000/metadata' \
--header 'Authorization: <TOKEN>'
```
Response example
```
{
    "numberOfCars": 19,
    "colors": {
        "Red": 4,
        "Blue": 15
    },
    "brands": {
        "Ford": 17,
        "Porsche": 1,
        "Mercedes": 1
    }
}
```
### Development

The Project is configured to work with VSCode.

You need a Mongo database. you can get a db running in Docke as follow.

```docker run -d -p 27017:27017 --name mongodb mongo```

1. Install dependences ```npm install``
2. Build: ``` npm run build```
3. start the project ```npm run start```
