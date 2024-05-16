import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/admins", "AdminsController.find");
    Route.get("/admins/:id", "AdminsController.findOne");
    Route.post("/admins", "AdminsController.create");
    Route.put("/admins/:id", "AdminsController.update");
    Route.delete("/admins/:id", "AdminsController.delete");
})