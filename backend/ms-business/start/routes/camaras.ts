import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/camaras/:id", "CamarasController.find");
    Route.post("/camaras", "CamarasController.create");
    Route.delete("/camaras/:id", "CamarasController.delete");
})