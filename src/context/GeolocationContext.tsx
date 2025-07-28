import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import haversine from 'haversine';
import CompassHeading from 'react-native-compass-heading';
// import { useKalman } from '../hooks/UseKalman';

const gpsFlux = 5;
const minBoundary = 20;
const maxBoundary = minBoundary + gpsFlux;

type Coordinates = { latitude: number; longitude: number };

// Renamed interface
export interface GeolocationContextValue {
  distance: number;
  inRange: boolean;
  coords: Coordinates | null;
  destinationCoords: Coordinates | null;
  heading: number;
  setDestinationCoords: (c: Coordinates) => void;
  ready: boolean
}

// Renamed context
export const GeolocationContext = createContext<GeolocationContextValue>({
  distance: 0,
  inRange: false,
  coords: null,
  destinationCoords: null,
  heading: 0,
  setDestinationCoords: () => { },
  ready: false
});

// Renamed provider
export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<Coordinates>({ latitude: 0, longitude: 0 });
  const [distance, setDistance] = useState(0);
  const [inRange, setInRange] = useState(false);
  const [headingValue, setHeadingValue] = useState(0);
  const [ready, setReady] = useState(false);
  const headingRef = useRef(0);
  //   const { filter: smoothHeading } = useKalman({ R: 0.05, Q: 3 });

  useEffect(() => {
    let watchId: number;

    async function startTracking() {
      const degree_update_rate = 1;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonPositive: 'OK',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      CompassHeading.start(degree_update_rate, ({ heading }: { heading: number; accuracy: number }) => {
        const newHeading = normalizeHeading(heading, headingRef.current);
        headingRef.current = newHeading;
        setHeadingValue(newHeading);
      });

      watchId = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const c = { latitude, longitude };
          setCoords(c);
          if (!ready) setReady(true);
        },
        (error) => {
          console.warn('[Geolocation Error]', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 500,
          fastestInterval: 500,
          showLocationDialog: true,
          forceRequestLocation: true,
        }
      );
    }

    startTracking();

    return () => {
      if (watchId !== undefined) Geolocation.clearWatch(watchId);
      CompassHeading.stop();
    };
  }, []);

  useEffect(() => {
    if (!coords) return;
    const d = toMeters(coords, destinationCoords);
    setDistance(d);
    setInRange((prev) => (prev ? d <= maxBoundary : d <= minBoundary));
  }, [coords, destinationCoords]);

  return (
    <GeolocationContext.Provider
      value={{ coords, distance, inRange, destinationCoords, heading: headingValue, setDestinationCoords, ready }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}

const toMeters = (a: Coordinates, b: Coordinates) =>
  Number(haversine(a, b, { unit: 'meter' }));

function normalizeHeading(current: number, previous: number): number {
  let delta = current - previous;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return previous + delta;
}
