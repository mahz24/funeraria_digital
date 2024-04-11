import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/cities", "CitiesController.find");
    Route.get("/cities/:id", "CitiesController.find");
    Route.post("/cities", "CitiesController.create");
    Route.put("/cities/:id", "CitiesController.update");
    Route.delete("/cities/:id", "CitiesController.delete");
})