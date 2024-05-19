# Case Study: Food Ordering App


### Live URL:

The implementation of the project has taken place on an AWS server. Please use the below url to access the APIs.

http://appdevelopment.pro:3000/


### Initial Setup Guide:



Run the command below to containerize the application:

$ docker compose up

Once the containers are up and running, we can access the NestJS application by visiting http://localhost:3000 in our web browser and pgAdmin by visiting http://localhost:5050 in our web browser.

Login to pgAdmin by using the email and password we specified earlier in the docker-compose.yml file, and then we will see this:

To rebuild our app container because of the changes made, we execute the command below:

$ docker compose up --build


### Features:

    Foodie Can See List of Dishes Available: ✔️

    Foodie Can See User Dishes: ✔️	

    Foodies Can Place an Order: :✔️	

    User Can See His Own Dishes: ✔️	

    User Can Create New Dishes: ✔️	

    Note: Please find the API's Postman collection at root directory.

![alt text](https://github.com/immHassan/foodOrderingApp/blob/main/diagrams/API.PNG?raw=true)

### System Design:

    Database ERD (Entity Relationship Diagram): ✔️	

![alt text](https://github.com/immHassan/foodOrderingApp/blob/main/diagrams/ERD.PNG?raw=true)



    High-Level Architecture Diagram: ✔️
	
![alt text](https://github.com/immHassan/foodOrderingApp/blob/main/diagrams/Architecture%20Diagram.PNG?raw=true)
    
### Development Aspects:

    Unit Testing: Not yet
    Use Postgres Database: ✔️	

    Framework Selection: NestJs ✔️	

### Good-to-Have:

    Docker + Docker Compose Setup: ✔️	
    Caching for Improved API Responses: ✔️
    Payload Validation using Joi or Zod: Joi ✔️	
    Error Handling: ✔️

    Deployment Using Supabase: As I have AWS account, I deployed it to my EC2 instanse.
