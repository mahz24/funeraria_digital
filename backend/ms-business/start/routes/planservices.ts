import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/planservices", "PlanXServicesController.find");
    Route.get("/planservices/:id", "PlanXServicesController.find");
    Route.post("/planservices", "PlanXServicesController.create");
    Route.put("/planservices/:id", "PlanXServicesController.update");
    Route.delete("/planservices/:id", "PlanXServicesController.delete");
    Route.get("/planservices/servicesDisponibles/:id", "PlanXServicesController.findServicesDisponibles");
    Route.get("/planservices/servicesNoDisponibles/:id", "PlanXServicesController.findServicesNoDisponibles");
})