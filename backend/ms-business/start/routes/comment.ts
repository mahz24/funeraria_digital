import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/comments", "CommentsController.find");
    Route.get("/comments/:id", "CommentsController.find");
    Route.get("/comments/execution/:id", "CommentsController.findComments");
    Route.post("/comments", "CommentsController.create");
    Route.put("/comments/:id", "CommentsController.update");
    Route.delete("/comments/:id", "CommentsController.delete");
})
