import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/transmisions", "TransmisionsController.find");
    Route.get("/transmisions/:id", "TransmisionsController.find");
    Route.post("/transmisions", "TransmisionsController.create");
    Route.delete("/transmisions/:id", "TransmisionsController.delete");
})
