# ShowMeAround API Documentation
Show Me Around is a platform where travelers from around the world hire local people for a more authentic destination experience.
- The API uses Node Js on the backend.
- POST, PUT & DELETE requests are protected, whereas GET request doesn't require any key.
- Please use `x-auth-key` as the key,  and `1fb15da6d3d8efb7f774b58884d649e9` as value for protected routes.
- Use software like POSTMAN for POST, PUT & DELETE requests.

## Page 1
##### All locations
> https://show-me-around-api.herokuapp.com/location
##### All cities based on States (available state_id = [1,2,3])
> https://show-me-around-api.herokuapp.com/location/1
##### All Profiles
> https://show-me-around-api.herokuapp.com/profiles

## Page 2
##### All profiles based on Cities (available city_id = [1,2,3,4,5])
> https://show-me-around-api.herokuapp.com/profiles/1
##### filters - Profiles based on only city
> https://show-me-around-api.herokuapp.com/filter/2
##### filter - Profiles based on cost (less than, more than, and range)
> https://show-me-around-api.herokuapp.com/filter/2?hcost=1200
> https://show-me-around-api.herokuapp.com/filter/2?lcost=500
> https://show-me-around-api.herokuapp.com/filter/2?hcost=1900&lcost=1400

##### filter - Profiles based on interest (available interest_id = [1,2,3,4,5,6,7])
> https://show-me-around-api.herokuapp.com/filter/1?interestId=4

##### filter - Profiles based on language (available language_id = [1,2,3,4,5,6,7,8])
> https://show-me-around-api.herokuapp.com/filter/3?languageId=6

##### filter - Profiles based on interest and language
> https://show-me-around-api.herokuapp.com/filter/5?languageId=6&interestId=4

##### filter - Sorting based on Rating & Cost (Default sorting is Highest Rating profiles on the top)
> https://show-me-around-api.herokuapp.com/filter/3?sortRating=1
> https://show-me-around-api.herokuapp.com/filter/3?sortCost=1


## Page 3
##### Individual profiles Details (available profile_id = [1,2,3.....14,15])
> https://show-me-around-api.herokuapp.com/profile/5


## Page 4
##### See All bookings
> https://show-me-around-api.herokuapp.com/bookings/
##### See bookings based on individual profile (available profile_id = [9,8,12,15])
> https://show-me-around-api.herokuapp.com/bookings/15

## Page 5
##### Create a new booking (this link require authentication) 
> https://show-me-around-api.herokuapp.com/booklocal (POST)
- x-auth-key = 1fb15da6d3d8efb7f774b58884d649e9
- Use below data for testing
> {
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
##### Update payment status based on booking id (Use booking_id 6 for testing purposes, authentication required)
> https://show-me-around-api.herokuapp.com/updateBooking/6 (PUT)
- x-auth-key = 1fb15da6d3d8efb7f774b58884d649e9
- Use below data for testing
> {
"bank_name": "HDFC BANK",
"payment_status": "TXN_SUCCESS"
}
## Page 7

##### Delete Booking based on booking id (Use booking_id 6 for testing purposes, authentication required)
> https://show-me-around-api.herokuapp.com/deleteBooking/6 (DELETE)
- x-auth-key = 1fb15da6d3d8efb7f774b58884d649e9
