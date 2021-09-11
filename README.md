# Cars Manager App
Application for Cars data management stored in MongoDb

## Runing the application
 Requires Docker

* run 
```docker-compose up```
## API USAGE

* Crate a new car POST , /car

```
curl --location --request POST 'http://localhost:3000/car' \
--header 'Content-Type: application/json' \
--data-raw '{
	"brand": "Ford",
	"color": "Blue",
	"model": "Mustang"
}'
```

### development

```docker run -d -p 27017:27017 --name mongodb mongo```

