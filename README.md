# ShowMeAround API Documentation

Show Me Around is a platform where travelers from around the world hire local people for a more authentic destination experience.

## Frontend - https://showmearound-react.web.app/

### Basic info about the API

- The API uses **Node Js** on the backend.
- API uses **MongoDB** for database.
- Use tools such as **POSTMAN** for simplifying POST, PUT & DELETE requests.

---

### List of all Profiles

> https://show-me-around-api.herokuapp.com/api/all-profiles **(GET)**<br>

## Page 1

### List of All Locations
> https://show-me-around-api.herokuapp.com/api/locations **(GET)**<br>

### List of All Interests
> https://show-me-around-api.herokuapp.com/api/interests **(GET)**<br>

### List of All Languages
> https://show-me-around-api.herokuapp.com/api/languages **(GET)**<br>

## Page 2

### List of profiles based on Cities (available city_id = [udaipur, jaipur, jodhpur, mumbai])

> https://show-me-around-api.herokuapp.com/api/location/udaipur **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/location/jaipur **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/location/jodhpur **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/location/mumbai **(GET)**<br>

#### Filter - Profiles based on only one City & All Filters(Langauges, Interest, Gender, Cost)

> https://show-me-around-api.herokuapp.com/api/filter/mumbai/?&languages=3&interests=2,5&gender=Female&price=-1 **(GET)**<br>

#### Filter - Profiles based on Languages (available language_id = [1,2,3,4])
> https://show-me-around-api.herokuapp.com/api/filter/udaipur/?&languages=3 **(GET)**<br>

#### Filter - Profiles sorted on based on Cost
> https://show-me-around-api.herokuapp.com/api/filter/udaipur/?&price=-1 **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/filter/udaipur/?&price=1 **(GET)**<br>

#### Filter - Profiles based on Interests (available interest_id = [1,2,3,4,5,6,7])
> https://show-me-around-api.herokuapp.com/api/filter/jaipur/?&interests=4 **(GET)**<br>

#### Filter - Profiles based on Gender 
> https://show-me-around-api.herokuapp.com/api/filter/udaipur/?&gender=Male **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/filter/udaipur/?&gender=Female **(GET)**<br>

## Page 3

### Individual Profile Details (Database currently have 15 dummy profiles)

> https://show-me-around-api.herokuapp.com/api/local/ch360 **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/local/ga1536 **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/local/pa47384 **(GET)**<br>

## Page 4
All the routes related to creating and updating orders/bookings are protected routes. Only logged in users can access them.
### Creating and Updating Bookings
> https://show-me-around-api.herokuapp.com/api/order **(POST)**<br>
> https://show-me-around-api.herokuapp.com/api/verify-payment **(POST)**<br>
> https://show-me-around-api.herokuapp.com/api/accept-order **(PUT)**<br>
> https://show-me-around-api.herokuapp.com/api/reject-order **(PUT)**<br>
> https://show-me-around-api.herokuapp.com/api/start-order **(POST)**<br>
> https://show-me-around-api.herokuapp.com/api/end-order **(POST)**<br>
## Page 5

### Booking History (Both as traveller and local)
Booking history routes are protected routes and shows the bookings based on the logged in user.

> https://show-me-around-api.herokuapp.com/api/user-booking **(GET)**<br>
> https://show-me-around-api.herokuapp.com/api/local-order **(GET)**<br>

## Page 6

### Authentication Routes
> https://show-me-around-api.herokuapp.com/api/register **(POST)**<br>
> https://show-me-around-api.herokuapp.com/api/login **(POST)**<br>
> https://show-me-around-api.herokuapp.com/api/edit-profile **(PUT)**<br>
#### User Details
> https://show-me-around-api.herokuapp.com/api/user **(GET)**<br>

---

## Features of this API

- Fetch Locations
- Fetch Profiles
- Filtered Profiles on the basis on below
  - Price
  - Ratings
  - Language
  - Interest
  - Also, API is capable of handling all four parameters in single parameter
- Create a new booking
- Update the booking
- Verify payments
- Protect routes using custom Middlewares

## Node Dependencies in Backend

- bcrypt
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongodb
- morgan
- razorpay
- uuid
