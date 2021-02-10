### Technical description ###
This project was created with Create React App.

Additional libraries which have been used are:

- react-async
- sass (for styling)

Application was developed in OS Windows 10 and Visual Studio Code and tested in:

- Mozilla Firefox version 85.0
- Google Chrome version 88.0.4324.150
- Microsoft Edge version 88.0.705.63

### How to run description ###

**Note: node_modules must be installed before starting server by executing `npm install` or `yarn install`**

In the project directory, you can run:

`yarn start` - runs the app in the development mode.

Then open [http://localhost:3000] to view it in the browser.

### Logic description ###
Project is made up of four components: `App`, `Dashboard`, `Form` and `Dropdown`

`App` - component used as a container for entire application.

`Dashboard` - component renders the requested mockup: A map (as an image) and a form.

`Form` - component renders all elements of the form. Also, is where user's input validation is performed, with the appropriate info messages (error, help info, required field)

`Dropdown` - component is responsible for fetching Categories and Subcategories with an async call to API and for rendering two dropdown menus respectively.

#### Regarding styling ####
A responsive design is performed when the max-width: 50rem.