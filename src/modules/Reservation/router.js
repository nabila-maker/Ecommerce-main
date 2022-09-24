
class ReservationRouter {
  constructor(router, auth, reservationController) {
    this.router = router;
    this.initializeRoutes(reservationController, auth);
    return this.router;
  }

  initializeRoutes(reservationController, auth) {
    this.router.route('/reservation')
  
    .post(auth.authenticate,reservationController.create)
    
      // .patch(auth.authenticate, reservationController.update)

     this.router.route('/reservationAllByUser')
    .get( auth.authenticate, reservationController.getAllByUser)
    .delete(auth.authenticate,reservationController.delete)
    .put(auth.authenticate,reservationController.update)
   
  }
}

export default ReservationRouter;
