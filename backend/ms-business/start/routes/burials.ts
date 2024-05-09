import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/burials", "BurialsController.find");
    Route.get("/burials/:id", "BurialsController.find");
    Route.post("/burials", "BurialsController.create");
    Route.put("/burials/:id", "BurialsController.update");
    Route.delete("/burials/:id", "BurialsController.delete");
})
