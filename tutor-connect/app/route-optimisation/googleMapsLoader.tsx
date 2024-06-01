// googleMapsLoader.js
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyAb-PIjXiApxjazFk76asxHbVQRuXQ6RRc",
  version: "weekly",
  libraries: ["places"], // Add additional libraries if needed
});

export default loader;
