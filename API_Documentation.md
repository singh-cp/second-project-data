# ShowMeAround API Documentation
Show Me Around is a platform where travelers from around the world hire local people for a more authentic destination experience.
### Basic info about the API
- The API uses **Node Js** on the backend.
- API uses **MongoDB** for database.
- POST, PUT & DELETE requests are protected, whereas GET request doesn't require authentication.
- Please use `x-auth-key` as the key,  and `1fb15da6d3d8efb7f774b58884d649e9` as value in headers for **protected/authenticated** routes.
- Use tools such as **POSTMAN** for simplifying POST, PUT & DELETE requests.

___

## Page 1
### List of Locations
> https://show-me-around-api.herokuapp.com/location
### List of cities based on States (available state_id = [1,2,3])
> https://show-me-around-api.herokuapp.com/location/1
### List of all Profiles
> https://show-me-around-api.herokuapp.com/profiles

## Page 2
### List of profiles based on Cities (available city_id = [1,2,3,4,5])
> https://show-me-around-api.herokuapp.com/profiles/1
### Filter - Profiles based on only one City
> https://show-me-around-api.herokuapp.com/filter/2
### Filter - Profiles based on Cost (less than, more than, and range)
> https://show-me-around-api.herokuapp.com/filter/2?hcost=1200
> https://show-me-around-api.herokuapp.com/filter/2?lcost=500
> https://show-me-around-api.herokuapp.com/filter/2?hcost=1900&lcost=1400

### Filter - Profiles based on Interest (available interest_id = [1,2,3,4,5,6,7])
> https://show-me-around-api.herokuapp.com/filter/1?interestId=4

### Filter - Profiles based on Language (available language_id = [1,2,3,4,5,6,7,8])
> https://show-me-around-api.herokuapp.com/filter/3?languageId=6

### Filter - Profiles based on Interest & Language
> https://show-me-around-api.herokuapp.com/filter/5?languageId=6&interestId=4

### Filter - Sorting based on Rating & Cost (Default sorting is Highest Rating profiles on the top)
> https://show-me-around-api.herokuapp.com/filter/3?sortRating=1
> https://show-me-around-api.herokuapp.com/filter/3?sortCost=1
> https://show-me-around-api.herokuapp.com/filter/3?sortCost=-1


## Page 3
### Individual Profile Details (available profile_id = [1,2,3.....14,15])
> https://show-me-around-api.herokuapp.com/profile/5


## Page 4
### List of all Bookings
> https://show-me-around-api.herokuapp.com/bookings/
### List of bookings based on Individual's Profile (available profile_id = [9,8,12,15])
> https://show-me-around-api.herokuapp.com/bookings/15

## Page 5
### Create a New-Booking (AUTHENTICATION required) 
> https://show-me-around-api.herokuapp.com/booklocal **(POST)**
- x-auth-key : 1fb15da6d3d8efb7f774b58884d649e9
- Use below data for testing <br>
{
    "booking_id": 6,
    "travel_date": "12/25/2022",
    "price": 1260,
    "booking_status": "Pending",
    "local_info": [
      {
        "local_id": 10,
        "local_email": "iamlocal10@gmail.com",
        "local_contact": 1010101010
      }
    ],
    "traveller_info": [
      {
        "traveler_id": 1,
        "traveller_email": "iamlocal1@gmail.com",
        "traveller_contact": 1111111111
      }
    ]
  }

## Page 6
### Update payment status based on booking id (Use booking_id 6 for testing purposes, AUTHENTICATION required)
> https://show-me-around-api.herokuapp.com/updateBooking/6 **(PUT)**
- x-auth-key : 1fb15da6d3d8efb7f774b58884d649e9
- Use below data for testing <br>
{
"bank_name": "HDFC BANK",
"payment_status": "TXN_SUCCESS"
}
## Page 7

### Delete Booking based on booking id (Use booking_id 6 for testing purposes, AUTHENTICATION required)
- x-auth-key : 1fb15da6d3d8efb7f774b58884d649e9
> https://show-me-around-api.herokuapp.com/deleteBooking/6 **(DELETE)**


___
## Features of this API
The API is capable of handeling *CRUD* (Create, Read, Update, Delete) operations.

- Fetch Locations
- Fetch Profiles of the localities
- Filtered Profiles on the basis on below
  - Sorting based on Ratings or Price
  - Price
  - Ratings
  - Language
  - Interest
  - Also, API is capable of handling all four parameters in single parameter
- Create a new booking
- Update the payment status of the booking
- Delete the booking
## Node Dependencies in Backend
- body-parser
- cors
- dotenv
- express
- mongodb
- morgan