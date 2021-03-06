# Skii App (SEI Project 3)

![Skii](./resources/screenshots/skii.png)

## Project Overview

Skii is a global ski resort application that allows members to be part of an interactive, online community where information, thoughts and opinions on the major ski resorts across the world are shared. 

This week-long project expanded on my frontend React skills developed for my [Crypto-Index](https://github.com/DanielTockan/Crypto-Index) project, but with an integrated backend using MongoDB and Mongoose as the base technologies. Given that this was a larger group project consisting of 4 people, Git and GitHub were the collaboration and version control tools used for all work. 

I contributed to most aspects of the front-end and back-end but had my own areas of focus - these will be highlighted. Many external libraries were used to enhance the client-side experience throughout the app's components. I implemented the Cloudinary widget library for image uploads for registered users with added crop functionality. 

Upon completion, Skii was deployed using Heroku.

### Click here to [Skii](https://lets-skii.herokuapp.com/) with us

To enjoy the full experience, you can sign-up using the credentials of your choice, OR alternatively use the following:

email: admin@admin.com <br>
password: admin

<br>

### Table of Contents

1. [Project Overview](#Project-Overview)
2. [The Brief](#The-Brief)
3. [Technologies Used](#Technologies-Used)
4. [The Approach](#The-Approach)
    - [The API](#The-API)
    - [Planning](#Planning)
    - [Back-end](#Back-end)
    - [Front-end](#Front-end)
5. [Triumphs](#Triumphs)
6. [Obstacles Faced and Lessons](#Obstacles-Faced-and-Lessons)
7. [Future Features](#Future-Features)

<br>

## The Brief

- Build a full-stack MERN web application
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which means multiple relationships and CRUD functionality for the relevant models
- Implement thoughtful user stories/wireframes, significant enough to clearly determine which features are core MVP and which are stretch goals
- Be deployed online so its accessible publicly (using Heroku and MongoDB Atlas database)
- Have a visually impressive design
- Timeframe: 1 week

<br>
<!-- - Use a framework for responsiveness.
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles.
- Use best practices for writing code, such as semantic markup. -->

## Technologies Used

### Back-end tech:

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Token
- Body Parser

### Front-end tech:

- HTML
- CSS
- Bootstrap framework
- JavaScript
- React (with hooks)
- Axios
- Cloudinary
- React Mapbox GL
- External Weather API

### Development Tools:

- VS Code
- Git
- GitHub
- NPM
- Insomnia
- Chrome Dev Tools
- Heroku

<br>

## The Approach

### The API:

Our online search for an existing ski API containing datapoints meeting our criteria was unsuccessful. The API's either had expensive licensing fees or were not adequately populated as described. As a result, we decided to build our own within the seed file:

```js
 {
   name: 'Val Thorens',
   country: 'France',
   top_elevation: 3568,
   bottom_elevation: 1650,
   lon: 6.58000,
   lat: 45.29806,
   image: 'https://i.imgur.com/LumFgEX.jpg',
   user: users[0],
   description: 'With the access of the Three Valleys, Val Thorens is one of the largest skiing area in the world! Beginners, intermidates and experts will all find a challenge here!',
   skilifts: '137',
   openingtimes: '08:30 - 16:30',
   slopeslength: '600km',
   adultticket: '€64.50,-',
   childticket: '€51.60,-',
   userRating: 4,
   numOfRatings: 0
  },
```

Over 40 resorts were added, gathering their data from various sources online. A drawback of this option was that we would have to manually scan update and implement them ourselves, however this was a necessary evil to get the information we desired.

### Planning:

Once the Ski resort concept was established a lot of focus was put into the planning of:
- What the schemata would look like, and the relationships between them
- What controllers and routes were required
- Where the data would be retrieved from (external API's, manual creation, or some combination of both)
- What pages were needed on the frontend, and how they would interact with the API
- What the MVP and stretch goals for the project were (via User Stories), and thinking ahead particularly about how the models would be impacted to support those
- What external libraries would be implemented
- Wireframing and decisions on the layout and design of the app were tackled after the back-end was complete

Our approach towards planning was vital in ensuring that all group members understood how the app would function at a fundamental level. It provided transparency of our deliverables, giving a baseline to track progress against. Most importantly, it made writing our back-end code simpler as fewer retrospective changes were necessary.

For example:

![Plan](./resources/screenshots/plan_to_production.png)

I took charge of the project management aspects for Skii. We used a Kanban style agile framework to monitor and control our work and progress with the help of a Trello board, and created user stories to define MVP and our stretch goals. 

![Trello](./resources/screenshots/skii_trello.png)

Daily stand-ups were held each morning, supplemented by regular check-ups on progress and any blockers faced. The occurred via Zoom breakout rooms and Slack - this was particularly useful as we applied pair-programming for debugging and problem solving.

### Back-end:

#### Schemata

The first step taken was to create the schemata for the app. Based off of the initial planning, three were created:
 - Users schema
 - Resorts schema
 - Comments schema

```js
const resortsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  top_elevation: { type: Number, required: true },
  bottom_elevation: { type: Number, required: true },
  lon: { type: Number, required: true },
  lat: { type: Number, required: true },
  image: { type: String, required: true },
  comments: [commentSchema],
  description: { type: String },
  skilifts: { type: String },
  openingtimes: { type: String },
  slopeslength: { type: String },
  adultticket: { type: String },
  childticket: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  userRating: { type: Number, required: true },
  numOfRatings: { type: Number, required: true }
})
```

The resorts schema had two fields that required different types of relationships in order to get our desired functionality. 

A relationship was created between the user field and the model, with object level permissions in mind. For particular scenarios within the app, logic was created to ensure that only authorised users would be able to execute CRUD functions - this will be expanded on in the controller's section. A reference relationship was chosen in this instance as the associated user (super admins) needed to be able to associate to multiple resort in order to execute CRUD functions to them. 

Conversely, the comments field applied an embedded relationship with the resorts model. Comments made had to belong to ONLY one resort in order for users to have meaningful interactions about the resorts they loved in one location (the page for that resort) - a key aspect of the app, and the reason behind this choice. This consideration about user interaction was the driving factor for creating a comments schema, rather than just a comments field. Comments need to belong to a user to enhance the social aspect, and users needed to be able to make as many comments as they like. Both aspects are not possible through using a comments field.

```js
const commentSchema = new mongoose.Schema({

  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }

}, {
  timestamps: true
})
```

For the user schema, we imported and employed the use of the Bcrypt library to hash and encrypt the user's password as an added level of security. 

```js
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })
```

Our password confirmation is stored in a virtual field and is checked against the password that the user enters before validation occurs.

```js
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })
```

#### Controllers

CRUD methods were created for users and resorts to execute the app's functionality. I created the user controllers. 

Conditional logic was used for scenarios where only authorised users, or the user associated with a particular aspect of the app would be able to access or amend data. An instance of this can be seen with the "modifyUser" function, responsible for allowing users to edit their credentials.

```js
function modifyUser(req, res) {
  const accountId = req.params
  const finalId = accountId.accountId
  const body = req.body

  const currentUser = req.currentUser

  User
    .findById(finalId)
    .then(account => {
      if (!account) return res.send({ message: 'No user by this name' })
      if (!account._id.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorised' })
      }
      account.set(body)
      console.log(body)

      return account.save()
    })
    .then(account => res.send(account))
    .catch(error => res.send(error))
}
```

All database requests to modify user credentials passed through the back-end router via a PUT request. Secure route middleware was added to the route as follows:

```js
router.route('/users/:accountId')
  .get(userController.singleUser)
  .delete(secureRoute, userController.removeUser)
  .put(secureRoute, userController.modifyUser)
```

The secure route controlled the authentication process, storing the ID of the logged in user via a Bearer token. JSON Web Token technology was imported to enable this like so:

```js
function secureRoute(req, res, next) {
  const authToken = req.headers.authorization
  console.log('in the secure route')
  console.log(authToken)

  if (!authToken || !authToken.startsWith('Bearer')) {
    console.log('first check')
    return res.status(401).send({ message: 'Unauthorised 1 - update and imageupload' })
  }
  const token = authToken.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).send({ message: 'Unauthorised 2' })
    console.log('second check')

    const userId = payload.sub
    User
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unauthorised 3' })
        console.log('third check')

        req.currentUser = user

        next()
      })
      .catch(()=> res.status(401).send({ message: 'Unauthorised 4' }))
  })
}
```

The two "if" statements within "modifyUser" function, then conducted the following checks: 
- The latter checked whether the user ID retrieved from the secure route matches that of the user that they are trying to edit. If not, access to the route was blocked
- The former checked whether a valid user is logged in to begin with. If not, once again, access to the route was blocked

The secure route was used across many other routes in our back-end for the following uses:
- Creating, updating and deleting comments
- Adding and removing favourite resorts to a user profile

Before proceeding to the front-end build, all controllers were tested on the back-end using Insomnia. This was a paired exercise carried out by Kasjan and I.

Making reference to the "modifyUser" function once again, the following test was carried out to ensure that the user level permissions worked as expected.

![Testing in Insomnia](./resources/screenshots/test_in_insomnia.png)

### Front-end:

After installing the React app and all the relevant dependencies, final sign-off was given on the pages that would be included. These were:
- Home Page
- Resorts Page
- Individual Resort Page
- My Account Page
- Login and Sign-Up Page

A combination of the Bootstrap framework and CSS were used for styling, with a monochromatic colour scheme to match the ice white snow theme.

#### Home Page

As the first point of contact with the App, I wanted something visually impressive that drew users in.

![Home page](./resources/screenshots/landing_page.png)

Using the React MapBox GL library, we rendered a map of the world, with markers depicting the resorts seeded from our database. The longitude and latitude fields present in our resorts model enabled this. React Links were used to send the user to the resort page of marker they clicked on.

```js
{resorts.map((resort, index) => {
        return <Link to={`/resorts/${resort.name}`} key={index}>
          <Marker 
            latitude={resort.lat}
            longitude={resort.lon}
            
          >
            {/* <div>
              <span>{resort.name}</span>
            </div> */}

            <img className="marker" src="https://img.icons8.com/material/24/000000/marker--v1.png" />
          </Marker>
        </Link>
      })}
```

A function enabling users to filter for the regions they are most interesting was applied, by clicking on the buttons towards the top left.

```js
function goToEurope() {
    const WorldViewport = {
      latitude: 46.2276,
      longitude: 2.2137,
      zoom: 4,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(WorldViewport)
  }
```

#### Resorts & Single Resort Page

For an alternate view to see all the resorts in our database, the resorts button in our navigation bar leads the user to this page:

![Ski Resorts](./resources/screenshots/resorts.png)

The display was achieved by mapping the resorts from our database into cards on a page, like so:

```js
{resorts.map((resort, index) => {

        return <div key={index} className="card">
          <img className="card-img-top" src={`${resort.image}`} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{resort.name}</h5>
            <h6>{resort.country}</h6>
            <p className="card-text-all-resorts">{resort.description}</p>
            {/* <p className="dot-dot">...</p> */}

            <Link to={`/resorts/${resort.name}`} className="btn btn-dark btn-resort">View Resort</Link>
          </div>
        </div>

      })}
```

Clicking on any of these resorts linked you to the individual page for the resort.

Here, users are also able to:
  - View information specific to that resort
  - Add the resort to their favourites (displayed on My Account page)
  - Leave comments about the resort (with CRUD functionality and user level permissions applied)
  - Add a rating to the resort

![Single Resorts](./resources/screenshots/single_resort.png)

- An external weather API and useState were used to obtain and dynamically update the current weather, and forecasts for the next 7 days:
- Similar to the markers on the homepage, weather information was obtained using longitude and latitude co-ordinates

```js
const [weather, updateWeather] = useState({ current: { weather: [{}] }, daily: [] })
```

```js
Resorts.
    findOne({ name: { $regex: name, $options: 'i' } } )
    .populate('comments.user')
    .then(resort => {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${resort.lat}&lon=${resort.lon}&exclude=hourly,minutely&appid=b12529b2552a67b6714b256d3318424c`)
        .then(resp => {


          res.send({ resort: resort, weather: resp.data })
        })
```

#### My Account Page

The My Account page is the one stop shop for editing personal information, uploading a new display picture and viewing your favourite resorts.

![My Account](./resources/screenshots/my_account.png)

The most complex aspect of this page was the integration of the Cloudinary widget to facilitate the upload of new images. This was implemented fully in the update your account page: 

![Update Account](./resources/screenshots/update_account.png)

This library was outside of the scope of the course, requiring me to go through the source documentation. I produced the following function that was triggered by an onClick event listener whenever the upload image button was pressed:

```js
function handleImageUpload(event) {
    event.preventDefault()

    const token = localStorage.getItem('token')

    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzt94',
        uploadPreset: 'skiresortapp',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        axios.put(`/api/users/${props.match.params.id}`, { image: result.info.secure_url }, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => updateFormData(res.data))
      }
    ).open()
  }
```

## Triumphs

- Excellent teamwork.
- No major issues experienced using git, i.e. losing data or mismanaged conflicts.
- Implemented majority of stretch goals due to smooth management of project.
- Gained confidence using external libraries and reading documentation.
- Learned how to use the Bootstrap framework.
- Smooth, minimal and professional looking design was accomplished.

## Obstacles Faced and Lessons

- Experienced difficulty finding ski resort API's that met our needs. We decided to build our own API instead and pull data that we could from external API's. An approach that I will use going forward.
- Had major issues with deployment due to caps locks in our file structure. Learned best practices for setting up file structures and how to deploy going forward.
- General issues with debugging trickier parts of the code that take a long time to figure out. Overcoming the feeling of lost and relying on pair-programming and methodical approach to solving problems.

## Future Features

- Ability to add resorts on the user interface.
- Ability to send friend/follow requests to other users on the website.
- Improvement to the responsiveness of the app in certain components.