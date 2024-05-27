import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/drivers", "DriversController.find");
    Route.get("/drivers/:id", "DriversController.findOne");
    Route.post("/drivers", "DriversController.create");
    Route.put("/drivers/:id", "DriversController.update");
    Route.delete("/drivers/:id", "DriversController.delete");
})