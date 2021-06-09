# Tamagotchi Front End

![SDG](./docs/button.png)

    - Once you have successfully deployed your application: Use the Insomnia app to work with your API. At a minimum, use your API endpoints to create and list your Pets

<!-- Explorer Mode -->

    - Have fun with the styling. Make your CSS neat and presentable, but apply your creativity!

    - The home page should show a list of all the pets in your API. The listing should include their name, birthday, hunger level, and happiness level.

    - Add a form to your home page to input a new pet's name and use your "CREATE" API to make a new pet. The list of pets should refresh.
    +

    - Make each pet on the home page a <Link> to a page showing the pet's detail. The detail page should show the name, birthday, hunger level, and happiness level.
    +

    - On the detail page, add buttons to:
     -  Play with the pet
     +
     -  Feed the pet
     +
     -  Scold the pet
     +

    - After each of the above actions, reload the data for the pet (use React to do this, NOT a force page reload)

    - Add a button to delete a pet. After deletion, redirect the user to the home page
    +

    - Add a link on the detail page to navigate to the home page.
    +

    - DEPLOY your front end and test it on your netlify version.

    - SHARE it with friends and brag about how you created the entire code for this.

<!-- Adventure Mode -->

    - Add some new fields to your pet. Perhaps a string-based URL of an image of the pet to display beside its name.

    - Add a "search" field on the home page. When the user types in that field, dynamically update the pet list only to include pets whose name includes the input text.

    - Ensure the pets on the home page are sorted by their NAMES. You could implement this in the FRONT END or the BACK END.

<!-- Epic Mode -->

    - Add a user interface on the home page to sort your pets by their name, hunger level, or happiness level.

<!----------------------------->
<!----------------------------->

GET
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets

No Body

<!----------------------------->
<!----------------------------->

GET
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets?graveyard=true

No Body

<!----------------------------->
<!----------------------------->

POST
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets

Body: {"name": "Stevie"}

<!----------------------------->
<!----------------------------->

GET
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/{id}

No Body

<!----------------------------->
<!----------------------------->

POST
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/{id}/Playtimes

Body: {}

<!----------------------------->
<!----------------------------->

POST
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/{id}/Feedings

Body: {}

<!----------------------------->
<!----------------------------->

Create Scolding:
POST
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/{id}/Scoldings

Body: {}

<!----------------------------->
<!----------------------------->

Delete Pet:
DELETE
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/{id}

No Body

<!----------------------------->
<!----------------------------->

Rename Pet:
PUT
https://tamagotchi-api-bradygrapentine.herokuapp.com/api/Pets/{id}

Body: {"id": 14,"name": "Stevie"}

<!----------------------------->

  <!-- 
  public class Pet
    { // add JSON properties
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public int HungerLevel { get; set; }
        public int HappinessLevel { get; set; }
        public DateTime LastInteractedWithDate { get; set; }
        public Boolean IsDead
        {
            get
            {
                if (LastInteractedWithDate.AddDays(3) <= DateTime.Now || HungerLevel >= 15)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        public string Description()
        {
            return $"{Id}: Name ~ {Name} Happiness Level ~ {HappinessLevel} Hunger Level ~ {HungerLevel} Birthday ~ {Birthday} Last Interaction Date ~ {LastInteractedWithDate} Dead? ~ {IsDead}";
        }
    }
