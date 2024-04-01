Foosha is a foodsharing app designed for mobile use. 

<img width="379" alt="Screenshot 2024-04-01 at 08 27 55" src="https://github.com/JayCeeKay1991/foosha/assets/70958275/6a5a4a26-cc64-4323-92d5-e497b5ab5c34">


## Collaborate

To collaborate, fork this repo and clone it into a local repository. Run `npm install` from client and server separately.
The client is started by running `npm run dev` from the client root folder. 
The server is started by running `npm start` from the server root folder.
To connect your own database, you might want to adapt a .env file locally with variables as defined in server/config.js.

## Tech stack
### Front end
- React
- CSS
- Cloudinary
- React-google-maps
  
### Back end & data
- Node.js
- Express
- Mongo DB
- Mongoose

### Suggestions for further development

- Sorting conversations by newest message and highlight unread messages
- Mark conversations when the corresponding food item is no longer available
- Show only food items in the list which are rendered in the selected area of the map
- Add badges to the food items regarding dietary preferences
- Convert Javascript to Typescript
- Adding testing


Foosha is deployed at https://foosha.netlify.app/
