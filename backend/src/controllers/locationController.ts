import { Request, Response } from 'express';
import Location from '../models/Location';

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    
    const filter: any = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const locations = await Location.find(filter).sort({ city: 1 });

    res.status(200).json({
      success: true,
      count: locations.length,
      locations,
    });
  } catch (error: any) {
    console.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch locations',
      error: error.message,
    });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    res.status(200).json({
      success: true,
      location,
    });
  } catch (error: any) {
    console.error('Get location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch location',
      error: error.message,
    });
  }
};

export const createLocation = async (req: Request, res: Response) => {
  try {
    const location = await Location.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Location created successfully',
      location,
    });
  } catch (error: any) {
    console.error('Create location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create location',
      error: error.message,
    });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      location,
    });
  } catch (error: any) {
    console.error('Update location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update location',
      error: error.message,
    });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Location deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete location',
      error: error.message,
    });
  }
};
