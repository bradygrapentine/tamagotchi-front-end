# Tamagotchi Front End

![SDG](./docs/button.png)

    - Once you have successfully deployed your application: Use the Insomnia app to work with your API. At a minimum, use your API endpoints to create and list your Pets

<!-- Explorer Mode -->

    - Have fun with the styling. Make your CSS neat and presentable, but apply your creativity!

    - The home page should show a list of all the pets in your API. The listing should include their name, birthday, hunger level, and happiness level.

    - Add a form to your home page to input a new pet's name and use your "CREATE" API to make a new pet. The list of pets should refresh.

    - Make each pet on the home page a <Link> to a page showing the pet's detail. The detail page should show the name, birthday, hunger level, and happiness level.

    - On the detail page, add buttons to:
     -  Play with the pet
     -  Feed the pet
     -  Scold the pet

    - After each of the above actions, reload the data for the pet (use React to do this, NOT a force page reload)

    - Add a button to delete a pet. After deletion, redirect the user to the home page

    - Add a link on the detail page to navigate to the home page.

    - DEPLOY your front end and test it on your netlify version.

    - SHARE it with friends and brag about how you created the entire code for this.

<!-- Adventure Mode -->

    - Add some new fields to your pet. Perhaps a string-based URL of an image of the pet to display beside its name.

    - Add a "search" field on the home page. When the user types in that field, dynamically update the pet list only to include pets whose name includes the input text.

    - Ensure the pets on the home page are sorted by their NAMES. You could implement this in the FRONT END or the BACK END.

<!-- Epic Mode -->

    - Add a user interface on the home page to sort your pets by their name, hunger level, or happiness level.

  <!-- class Program 
    {
        static async Task GetPets()
        {
            var url = "http://localhost:5000/api/Pets";
            var client = new HttpClient();
            var allPetsAsStream = await client.GetStreamAsync(url);
            var allPets = await System.Text.Json.JsonSerializer.DeserializeAsync<List<Pet>>(allPetsAsStream);
            Console.WriteLine();
            foreach (var pet in allPets)
            {
                Console.WriteLine(pet.Description());
            }
            Console.WriteLine();
        }

        static async Task GetDeadPets()
        {
            var url = "http://localhost:5000/api/Pets?graveyard=true";
            var client = new HttpClient();
            var allPetsAsStream = await client.GetStreamAsync(url);
            var allPets = await System.Text.Json.JsonSerializer.DeserializeAsync<List<Pet>>(allPetsAsStream);
            Console.WriteLine();
            foreach (var pet in allPets)
            {
                Console.WriteLine(pet.Description());
            }
            Console.WriteLine();
        }

        static async Task PostPet()
        {
            //{"name": "Stevie"} String input for posting
            var client = new HttpClient();
            Console.Write("What is the name of your new pet? ");
            var name = Console.ReadLine();
            var newPet = new Pet();
            newPet.Name = name;
            var jsonBody = JsonSerializer.Serialize(newPet);
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var url = "http://localhost:5000/api/Pets";
            var response = await client.PostAsync(url, jsonBodyAsContent);
        }

        static async Task<Pet> GetPet(string id)
        {
            var client = new HttpClient();
            if (id != null)
            {
                var url = $"http://localhost:5000/api/Pets/{id}";
                var petAsStream = await client.GetStreamAsync(url);
                var pet = await System.Text.Json.JsonSerializer.DeserializeAsync<Pet>(petAsStream);
                return pet;
            }
            else
            {
                return null;
            }
        }

        static async Task CreatePlaytime()
        {
            Console.Write("What is the id of the pet that you'd like to play with? ");
            var id = Console.ReadLine();
            var client = new HttpClient();
            var newPlaytime = "{}";
            var jsonBody = JsonSerializer.Serialize(newPlaytime);
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var url = $"http://localhost:5000/api/Pets/{id}/Playtimes";
            var response = await client.PostAsync(url, jsonBodyAsContent);
        }

        static async Task CreateFeeding()
        {
            Console.Write("What is the id of the pet that you'd like to feed? ");
            var id = Console.ReadLine();
            var client = new HttpClient();
            var newFeeding = "{}";
            var jsonBody = JsonSerializer.Serialize(newFeeding);
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var url = $"http://localhost:5000/api/Pets/{id}/Feedings";
            var response = await client.PostAsync(url, jsonBodyAsContent);
        }

        static async Task CreateScolding()
        {
            Console.Write("What is the id of the pet that you'd like to scold? ");
            var id = Console.ReadLine();
            var client = new HttpClient();
            var newScolding = "{}";
            var jsonBody = JsonSerializer.Serialize(newScolding);
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var url = $"http://localhost:5000/api/Pets/{id}/Scoldings";
            var response = await client.PostAsync(url, jsonBodyAsContent);
        }

        static async Task DeletePet()
        {
            var client = new HttpClient();
            Console.Write("What is the id of the pet that you'd like to delete? ");
            var id = Console.ReadLine();
            var url = $"http://localhost:5000/api/Pets/{id}";
            var response = await client.DeleteAsync(url);
        }

        static async Task RenamePet()
        {
            //{"id": 14,"name": "Stevie"} String input for renaming
            Console.Write("What is the id of the pet that you'd like to rename? ");
            var id = Console.ReadLine();
            Console.WriteLine();
            Pet updatedPet = await GetPet(id);
            Console.Write("What is the pet's new name? ");
            var name = Console.ReadLine();
            Console.WriteLine();
            var client = new HttpClient();
            updatedPet.Name = name;
            var jsonBody = JsonSerializer.Serialize(updatedPet);
            var jsonBodyAsContent = new StringContent(jsonBody);
            jsonBodyAsContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var url = $"http://localhost:5000/api/Pets/{id}";
            var response = await client.PutAsync(url, jsonBodyAsContent);
        }

        static string Menu()
        {
            Console.Clear();
            Console.WriteLine();
            Console.WriteLine("What would you like to do?");
            Console.WriteLine("(SL) See living pets");
            Console.WriteLine("(SD) See dead pets");
            Console.WriteLine("(C)reate new pet");
            Console.WriteLine("(P)lay with a pet (must know pet ID)");
            Console.WriteLine("(F)eed a pet (must know pet ID)");
            Console.WriteLine("(S)cold a pet (must know pet ID)");
            Console.WriteLine("(R)ename a pet(must know pet ID");
            Console.WriteLine("(D)elete a pet(must know pet ID");
            Console.WriteLine("(Q) Quit the application");
            Console.WriteLine();
            Console.Write("Select an option and press Enter: ");
            var choice = Console.ReadLine().ToUpper();
            return choice.ToUpper();
        } -->
