# Social Media App

## BACKEND
- ### Fix bug in profile update functionality
     user.routes.js file and update.jsx files updation API integration bug \
      **Description:** <br>
        Old information like name is updated to empty string when prophotoURL is updated
         

## FRONTEND
- ### Bug in Login and Register form 
    Login and Register form gets submitted without proper input
    **Description:** <br>
    When the login and registration form is incompletely filled and enter is pressed then, the "handleSubmit" function submits the form with 
    {name : "", email : "", password : ""}
    


## BOTH

- ### Firebase Profile Photo Delete Functionality
    **Possible Solution:** \
        Use firebase delete function to delete the file in storage \
        After successful deletion use updation API "/users/updateprofile" and assign empty string as new profile photo URL to profilePhotoURL of the request body
        

