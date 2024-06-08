import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/clients", "ClientsController.find");
    Route.get("/clients/non", "ClientsController.findWithoutHolderAndBenefactor");
    Route.get("/clients/:id", "ClientsController.findOne");
    Route.post("/clients", "ClientsController.create");
    Route.put("/clients/:id", "ClientsController.update");
    Route.delete("/clients/:id", "ClientsController.delete");
})