// import { Request, Response, NextFunction } from 'express';
// import ValidateError from '../utils/ValidateError';
// import NotFoundError from '../utils/NotFoundError';
// import BadRequest from '../utils/BadRequest';
// import NonProcessableEntity from '../utils/NonProcessableEntity';

// export default class ErrorHandler {
//   static handlerError(error:Error, _req: Request, res: Response, _next:NextFunction) {
//     if (error instanceof ValidateError) {
//       return res.status(401).json({ message: error.message });
//     }
//     if (error instanceof NotFoundError) {
//       return res.status(404).json({ message: error.message });
//     }
//     if (error instanceof BadRequest) {
//       return res.status(400).json({ message: error.message });
//     }
//     if (error instanceof NonProcessableEntity) {
//       return res.status(422).json({ message: error.message });
//     }
//     console.error('ERRO MIDDLE', error);
//     return res.status(500).end();
//   }
// }
