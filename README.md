## Instructions to run

Using Docker:
Make sure you have docker installed on your system   
In the root folder run:  
### `docker-compose up`

OR

In the root folder, run:
### `npm install`
and then
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

## Assignment approach:  

Note: I am a frontend developer so skipped the backend part.   

To start off, I created a data.json file in the public folder and added the data given in the assignment. To achieve drag and drop functionality I used the react-dnd library. To display the cards I'm using a grid layout with a maximum of 3 columns, so with the initial data there should be 3 cards on the first row and 2 on the second. I added 5 static image links in a file called imageLinks.ts inside the constants folder to use for the cards since no images were given. My approach for this would ideally be different if the number of cards were to change. Clicking on the image would enlarge the image with a backdrop and pressing ESC will dismiss the image.  
On dragging and dropping a card to another slot, there is an autosave feature enabled after 5 sec. So after you drag and drop a card, it will be saved after 5 sec, and even if you make some more changes within the 5 sec that will not be saved since the timer will reset, so it is essentially a debouncing feature. The api is not called every 5 sec continuosly because it is not needed and is only called if the user drags and drops a card. Also the time since last saved is displayed on top.  
On inital load the data from data.json file is displayed and stored in local storage of the browser and is retrieved on subsequent loads instead of loading from the file. After making updates (dragging and dropping a card), the update api updates the data in local storage so we get the updated data on refresh.   
I used the suggested mock service worker: https://github.com/mswjs/msw to mock a server and implemented GET request to get the data (from data.json on initial load and from local storage on subsequent loads), and POST request to update the data in local storage with the updated data after drag and drop (basically the updated sequence).   
It was not clear whether it was required for the user to be able to add more data to the existing dataset so it hasn't been implemented, also that would need additional UI for the user to enter the title and type of the new item and since it was not mentioned in the assignment it hasn't been implemented.   
Finally, I added a Dockerfile and docker-compose.yaml file to run the app using docker.  
As for Part 5, I wasn't sure if this was for backend developers since it asks about designing apis.