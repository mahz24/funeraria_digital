import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/transmisions/:id", "TransmisionsController.find"); // se creó la ruta
    Route.post("/transmisions", "TransmisionsController.create");
    Route.delete("/transmisions/:id", "TransmisionsController.delete");
})