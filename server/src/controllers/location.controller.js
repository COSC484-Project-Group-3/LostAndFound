import Location from '../models/location.model.js';
export class LocationController {
    
    /**
    * Create a new location
    *
    * @param {*} req request object
    * @param {*} res response object
    * @returns {*} the new location
    * @returns {*} 500 if there is an error
    * @returns {*} 400 if the location is invalid
    */
    static createLocation = (req, res) => {
        try {
            const location = new Location({
                latitude: req.body.latitude,
                longitude: req.body.longitude
            });
            location.save((err, location) => {
                if (err) {
                    res.status(400).json({ message: err.message });
                }
                res.status(201).json(location);
            })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    /**
     * Get all locations
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} all locations
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the location is invalid
     * @returns {*} 404 if the location is not found
     */
    static getAllLocations = (req, res) => {
        Location.find((err, locations) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!locations) {
                res.status(404).json({ message: 'Locations not found' });
                return;
            }
            res.status(200).json(locations);
        });
    }

    /**
     * Get a location by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the location
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the location is invalid
     * @returns {*} 404 if the location is not found
     */
    static getLocation = (req, res) => {
        Location.findById(req.params.id, (err, location) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.status(200).json(location);
        });
    }

    /**
     * Update a location by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the updated location
     * @returns {*} 500 if there is an error
     * @returns {*} 400 if the location is invalid
     * @returns {*} 404 if the location is not found
     */
    static updateLocation = (req, res) => {
        Location.findByIdAndUpdate(req.params.id, req.body, (err, location) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.status(200).json(location);
        });
    }

    /**
     * Delete a location by id
     * 
     * @param {*} req request object
     * @param {*} res response object
     * @returns {*} the deleted location
     * @returns {*} 500 if there is an error
     * @returns {*} 404 if the location is not found
     * @returns {*} 200 if the location is deleted
     */
    static deleteLocation = (req, res) => {
        Location.findByIdAndDelete(req.params.id, (err, location) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            } else if (!location) {
                res.status(404).json({ message: 'Location not found' });
                return;
            }
            res.status(200).json({ message: 'Location deleted' });
        });
    }
}
