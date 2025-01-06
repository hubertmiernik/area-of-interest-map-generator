import React, {useEffect, useRef} from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {OSM} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import {fromLonLat} from 'ol/proj';

interface MapViewerProps {
    geojsonData: string;
    mapHeight?: string;
}

const MapViewer: React.FC<MapViewerProps> = ({ geojsonData, mapHeight = '500px' }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const vectorLayerRef = useRef<VectorLayer | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

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
                center: fromLonLat([18.0, 53.8]),
                zoom: 5,
            }),
        });
        vectorLayerRef.current = vectorLayer;
    }, []);

    useEffect(() => {
        if (!geojsonData || !vectorLayerRef.current) return;

        try {
            const vectorSource = new VectorSource({
                features: new GeoJSON().readFeatures(geojsonData, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857',
                }),
            });

            vectorLayerRef.current.setSource(vectorSource);

            const map = mapInstanceRef.current;
            if (map) {
                const extent = vectorSource.getExtent();
                map.getView().fit(extent, { padding: [20, 20, 20, 20], duration: 1000 });
            }
        } catch (error) {
            console.error('Error loading GeoJSON:', error);
        }
    }, [geojsonData]);

    return <div ref={mapRef} style={{ width: '100%', height: mapHeight, border: '1px solid #ccc' }} />;
};

export default MapViewer;
