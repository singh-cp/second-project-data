# API url
> https://show-me-around-api.herokuapp.com/

// page 1
# All locations
> https://show-me-around-api.herokuapp.com/location
# All cities based on States (available state_id = [1,2,3])
> https://show-me-around-api.herokuapp.com/location/1
# All Profiles
> https://show-me-around-api.herokuapp.com/profiles

// Page 2
# All profiles based on Cities (available city_id = [1,2,3,4,5])
> https://show-me-around-api.herokuapp.com/profiles/1
# filters - Profiles based on only city
> https://show-me-around-api.herokuapp.com/filter/2
# filter - Profiles based on cost (less than, more than, and range)
> https://show-me-around-api.herokuapp.com/filter/2?hcost=1200
> https://show-me-around-api.herokuapp.com/filter/2?lcost=500
> https://show-me-around-api.herokuapp.com/filter/2?hcost=1900&lcost=1400

# filter - Profiles based on interest (available interest_id = [1,2,3,4,5,6,7])
> https://show-me-around-api.herokuapp.com/filter/1?interestId=4

# filter - Profiles based on language (available language_id = [1,2,3,4,5,6,7,8])
> https://show-me-around-api.herokuapp.com/filter/3?languageId=6

# filter - Sorting based on Rating & Cost (Default sorting is Highest Rating profiles on the top)
> https://show-me-around-api.herokuapp.com/filter/3?sortRating=1
> https://show-me-around-api.herokuapp.com/filter/3?sortCost=1


// Page 3
# Individual profiles Details (available profile_id = [1,2,3.....14,15])
> https://show-me-around-api.herokuapp.com/profile/5