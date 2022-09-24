import ReservationEntity from './entity';
import { ApiError } from '../../helpers/error';
import ProductEntity from '../Product/entity';

class ReservationService {
  constructor(reservationRepository) {
    this.reservationRepo = reservationRepository;
  }

  async getAll() {
    const reservation = await this.reservationRepo.findAll();
    return reservation.map((reservation) => new ReservationEntity(reservation));
  }
  // async getAllByUser(userId) {
    
  //   const reservation = await this.reservationRepo.findById(userId);
  //   return reservation.map((reservation) => new ReservationEntity(reservation));
  
  // }

  async getOne(reservationData) {
    const reservationEntity = new ReservationEntity(reservationData);
    const reservation = await this.reservationRepo.findById(reservationEntity);
    return reservation;
  }



  async getAllByUser(userId) {

const reservationEntity = new ReservationEntity({userId});
    const reservation = await this.reservationRepo.findByReservation(reservationEntity);
    // console.log("heyyy",reservation)
    return reservation;
  }


 

  async create(reservationData) {
    console.log('hellooooo',reservationData)
    const reservationEntity = new ReservationEntity(reservationData);
      // if (!reservationEntity) {  throw new ApiError(400,"reservation existante", "Cette réservation existe");}
  const productAlreadyReservedByUser = await this.reservationRepo.productAlreadyReservedByUser(reservationEntity)
  if(!!productAlreadyReservedByUser){
    return new ApiError(409,"reservation existante", "Cette réservation existe")
  }else{
const newReservation = await this.reservationRepo.create(reservationEntity);
    return new ReservationEntity(newReservation)
  } 

}



  async update(reservationData) {
    const reservationEntity = new ReservationEntity(reservationData);
    // const reservationFound = await this.reservationRepo.findById(reservationEntity);
    const reservation = this.reservationRepo.update(reservationEntity.reservationId);
    return reservation;
  }

  async delete(reservationData) {
    const reservationEntity = new ReservationEntity(reservationData);
    // const reservationFound = await this.reservationRepo.findById(reservationEntity);
    const reservationDeleted = this.reservationRepo.delete(reservationEntity.reservationId);
    return reservationDeleted;
  }

  


}

export default ReservationService;
