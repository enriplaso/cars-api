import { Request, Response } from 'express';

export interface ICarController {
    /**
     * Creates new car from a request body object and adds the created car UUID to the respose
     * @param req
     * @param res
     */
    createNewCar(req: Request, res: Response): Promise<void>;

    /**
     * Deletes a car from a request SerialUUID passed as path param
     * @param req
     * @param res
     */
    deletCarBySerialUUID(req: Request, res: Response): Promise<void>;

    /**
     * Finds and returns car from a request SerialUUID passed as path param
     * @param req
     * @param res
     */
    getCarBySerialUUID(req: Request, res: Response): Promise<void>;

    /**
     * Updates car properties given in the request body
     * @param req
     * @param res
     */
    updateSingleProperties(req: Request, res: Response): Promise<void>;

    /**
     * Adds Cars metadata to the response
     * @param _
     * @param res
     */
    getMetadata(_: Request, res: Response): Promise<void>;
}
