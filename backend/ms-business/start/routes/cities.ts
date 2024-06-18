import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/cities", "CitiesController.findAll");
    Route.get("/cities/:id", "CitiesController.find");
    Route.get("/cities/department/:id", "CitiesController.findCities");
    Route.post("/cities", "CitiesController.create");
    Route.put("/cities/:id", "CitiesController.update");
    Route.delete("/cities/:id", "CitiesController.delete");
})