import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/holders", "HoldersController.find");
    Route.get("/holders/:id", "HoldersController.find");
    Route.get("/holders/benefactor/:id", "HoldersController.findPrincipal");
    Route.post("/holders", "HoldersController.create");
    Route.put("/holders/:id", "HoldersController.update");
    Route.delete("/holders/:id", "HoldersController.delete");
})