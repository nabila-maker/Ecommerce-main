import { ApiError } from "../../helpers/error";

class ReservationController {
    constructor(reservationService) {
      this.reservationService = reservationService;
    }
  
    getAll = async ({ res, next }) => {
      try {
        const reservations = await this.reservationService.getAll();
        res.status(200).json(reservations);
      } catch (err) {
        next(err);
      }
    };
  
    create = async (req, res, next) => {
      try {
        const userId = req.currentUserId;
        console.log(req.body )
        const reservationCreate = await this.reservationService.create({ ...req.body,userId });
        console.log(reservationCreate)
      if(reservationCreate instanceof ApiError){
        throw reservationCreate
      }
        res.status(201).json(reservationCreate);
   
      } catch (err) {
        next(err);
      }
    };
  
    getOne = async (req, res, next) => {
      try {
        const service = await this.reservationService.getOne({ ...req.body });
  
        res.status(201).json(service);
      } catch (err) {
        next(err);
      }
    };
  
    // getAllByUser = async (req, res, next) => {
    //   try {
    //     console.log(req.body)
    //     const { userId } = req.body;
        
    //     const service = await this.reservationService.getAllByUser(userId);
    //     res.status(201).json(service);
    //   } catch (err) {
    //     next(err);
    //   }

    getAllByUser = async (req, res, next) => {
      try {

        const userId = req.currentUserId
        const service = await this.reservationService.getAllByUser(userId);
        console.log(service)
        res.status(201).json(service);
      } catch (err) {
        next(err);
      }
    };
      
   
    

    findById = async (req, res, next) => {
      try {
        
        const { userId } = req.body;
        
        const service = await this.reservationService.getAllByUser(userId);
        res.status(201).json(service);
      } catch (err) {
        next(err);
      }
    
    };

    update = async (req, res, next) => {
      try {
        const { reservationId } = req.body;
        const service = await this.reservationService.update({ reservationId });
     
  
        res.status(200).json(service);
      } catch (err) {
        next(err);
      }
    };

    delete = async (req, res, next) => {
      try {
        const { reservationId } = req.query;
       const response = await this.reservationService.delete({ reservationId });
     
  
        res.status(204).json(response);
      } catch (err) {
        next(err);
      }
    };

  
  
  }
  
  export default ReservationController;