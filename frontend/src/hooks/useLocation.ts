'use client';

import { useState, useEffect } from 'react';
import { Location } from '@/types/location';
import api from '@/utils/api';

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

interface UseLocationReturn {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
  availableLocations: Location[];
  isLoading: boolean;
  error: string | null;
  detectLocation: () => void;
  isDetecting: boolean;
}

export const useLocation = (): UseLocationReturn => {
  const [selectedLocation, setSelectedLocationState] = useState<Location | null>(null);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      try {
        setSelectedLocationState(JSON.parse(savedLocation));
      } catch (e) {
        console.error('Failed to parse saved location:', e);
      }
    }
  }, []);

  // Fetch available locations
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/locations');
      // Handle both response formats
      const locations = response.data.locations || response.data || [];
      setAvailableLocations(Array.isArray(locations) ? locations : []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch locations');
      console.error('Error fetching locations:', err);
      setAvailableLocations([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedLocation = (location: Location) => {
    setSelectedLocationState(location);
    localStorage.setItem('selectedLocation', JSON.stringify(location));
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestLocation = (coords: GeolocationCoordinates): Location | null => {
    if (availableLocations.length === 0) return null;

    let nearestLocation: Location | null = null;
    let minDistance = Infinity;

    availableLocations.forEach((location) => {
      if (location.coordinates) {
        const distance = calculateDistance(
          coords.latitude,
          coords.longitude,
          location.coordinates.latitude,
          location.coordinates.longitude
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = location;
        }
      }
    });

    // If no location with coordinates found, return first active location
    if (!nearestLocation) {
      nearestLocation = availableLocations.find((loc) => loc.isActive) || null;
    }

    return nearestLocation;
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: GeolocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const nearest = findNearestLocation(coords);
        if (nearest) {
          setSelectedLocation(nearest);
        } else {
          setError('No service locations found near you');
        }
        setIsDetecting(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to detect your location. Please select manually.');
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return {
    selectedLocation,
    setSelectedLocation,
    availableLocations,
    isLoading,
    error,
    detectLocation,
    isDetecting,
  };
};
