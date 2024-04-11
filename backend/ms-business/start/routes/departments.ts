import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/departments", "DepartmentsController.find");
    Route.get("/departments/:id", "DepartmentsController.find");
    Route.post("/departments", "DepartmentsController.create");
    Route.put("/departments/:id", "DepartmentsController.update");
    Route.delete("/departments/:id", "DepartmentsController.delete");
})