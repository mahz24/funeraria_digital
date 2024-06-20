import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/subscriptions", "SubscriptionsController.find");
    Route.get("/subscriptions/:id", "SubscriptionsController.find");
    Route.get("/subscriptions/client/:id", "SubscriptionsController.findPlans");
    Route.get("/subscriptions/plan/:id", "SubscriptionsController.findClients");
    Route.post("/subscriptions", "SubscriptionsController.create");
    Route.put("/subscriptions/:id", "SubscriptionsController.update");
    Route.delete("/subscriptions/:id", "SubscriptionsController.delete");
})