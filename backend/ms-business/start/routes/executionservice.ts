import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/executionservice", "ExecutionServicesController.find");
    Route.get("/executionservice/:id", "ExecutionServicesController.find");
    Route.get("/executionservice/client/:id", "ExecutionServicesController.findServices");
    Route.get("/executionservice/service/:id", "ExecutionServicesController.findClients");
    Route.post("/executionservice", "ExecutionServicesController.create");
    Route.put("/executionservice/:id", "ExecutionServicesController.update");
    Route.delete("/executionservice/:id", "ExecutionServicesController.delete");
})
