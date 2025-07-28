import { useContext } from "react";
import { GeolocationContext, GeolocationContextValue } from "../context/GeolocationContext";

// Hook to consume context
export function useGeolocation(): GeolocationContextValue {
  const ctx = useContext(GeolocationContext);
  return ctx;
}