class ReservationEntity {
    constructor({
      reservationId, date, userId, productId,status
    }) {
      this.reservationId = reservationId;
      this.date = date;
      this.userId = userId;
      this.productId = productId;
      this.status = status;
    }

  }
  
  export default ReservationEntity;
  