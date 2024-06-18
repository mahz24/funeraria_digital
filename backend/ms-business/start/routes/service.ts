import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/services", "ServicesController.find");
    Route.get("/services/:id", "ServicesController.find");
    Route.get("/services/plan/:id", "ServicesController.findServices");
    Route.post("/services", "ServicesController.create");
    Route.put("/services/:id", "ServicesController.update");
    Route.delete("/services/:id", "ServicesController.delete");
})
