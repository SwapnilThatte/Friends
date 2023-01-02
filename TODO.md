# Social Media App

- ### Fix bug in profile update functionality
     user.routes.js file and update.jsx files updation API integration bug \
      **Description:** <br>
        Old information like name is updated to empty string when prophotoURL is updated
         
- ### Firebase Profile Photo Delete Functionality
    **Possible Solution:** \
        Use firebase delete function to delete the file in storage \
        After successful deletion use updation API "/users/updateprofile" and assign empty string as new profile photo URL to profilePhotoURL of the request body
        
        
  
