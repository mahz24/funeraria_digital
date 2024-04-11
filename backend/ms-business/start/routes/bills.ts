import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/bills", "BillsController.find");
    Route.get("/bills/:id", "BillsController.find");
    Route.post("/bills", "BillsController.create");
    Route.put("/bills/:id", "BillsController.update");
    Route.delete("/bills/:id", "BillsController.delete");
})