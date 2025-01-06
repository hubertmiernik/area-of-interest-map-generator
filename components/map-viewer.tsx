import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";
import { useBreakpoint } from "@/hooks/common/use-breakpoint";

interface MapViewerProps {
  geojsonData: string;
  mapHeight?: string;
  className?: string;
}

const MapViewer: React.FC<MapViewerProps> = ({ geojsonData, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorLayerRef = useRef<VectorLayer | null>(null);
  const previousGeojsonData = useRef<string | null>(null);
  const { isMd } = useBreakpoint("md");

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    mapInstanceRef.current = new Map({
      target: mapRef.current,
      layers: [baseLayer, vectorLayer],
      view: new View({
        zoom: isMd ? 5 : 3,
      }),
    });
    vectorLayerRef.current = vectorLayer;
  }, []);

  useEffect(() => {
    if (
      !geojsonData ||
      !vectorLayerRef.current ||
      previousGeojsonData.current === geojsonData
    ) {
      return;
    }

    try {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonData, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }),
      });

      vectorLayerRef.current.setSource(vectorSource);

      const map = mapInstanceRef.current;
      if (map) {
        const extent = vectorSource.getExtent();
        map
          .getView()
          .fit(extent, { padding: [20, 20, 20, 20], duration: 1000 });
      }

      previousGeojsonData.current = geojsonData;
    } catch (error) {
      console.error("Error loading GeoJSON:", error);
    }
  }, [geojsonData]);

  return (
    <div
      className={`w-full h-[35rem] rounded-b-xl overflow-hidden ${className}`}
      ref={mapRef}
    />
  );
};

export default MapViewer;
