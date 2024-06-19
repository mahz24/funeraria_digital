import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/benefactors", "BenefactorsController.find");
    Route.get("/benefactors/:id", "BenefactorsController.find");
    Route.get("/benefactors/holder/:id", "BenefactorsController.findBenefactors");
    Route.post("/benefactors", "BenefactorsController.create");
    Route.put("/benefactors/:id", "BenefactorsController.update");
    Route.delete("/benefactors/:id", "BenefactorsController.delete");
})