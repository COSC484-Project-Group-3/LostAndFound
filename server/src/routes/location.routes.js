import { Router } from 'express';
import { LocationController } from '../controllers/location.controller.js';

const LocationRoutes = Router();

/**
 * @route POST /api/locations/create
 * @description Create a location
 */
LocationRoutes.post('/create', LocationController.createLocation);

/**
 * @route GET /api/locations/locations
 * @description Get all locations
 */
LocationRoutes.get('/locations', LocationController.getAllLocations);

/**
 * @route GET /api/locations/location/:id
 * @description Get a location
 */
LocationRoutes.get('/location/:id', LocationController.getLocation);

/**
 * @route PATCH /api/locations/update/:id
 * @description Update a location
 */
LocationRoutes.patch('/update/:id', LocationController.updateLocation);

/**
 * @route DELETE /api/locations/delete/:id
 * @description Delete a location
 */
LocationRoutes.delete('/delete/:id', LocationController.deleteLocation);

export default LocationRoutes;
