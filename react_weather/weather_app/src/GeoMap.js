import React from "react";
import "./GeoMap.css";
import "ol/ol.css";
import { useGeographic } from "ol/proj";
import { Map, View, Feature } from "ol/index";
import { Point } from "ol/geom";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Circle, Fill } from "ol/style";

class GeoMap extends React.Component {
  componentDidMount() {
    useGeographic();

    const place = [this.props.lon, this.props.lat];

    const point = new Point(place);

    new Map({
      target: "map",
      view: new View({
        center: place,
        zoom: 16
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(point)]
          }),
          style: new Style({
            image: new Circle({
              radius: 9,
              fill: new Fill({ color: "red" })
            })
          })
        })
      ]
    });
  }
  render() {
    return (
      <div className="column">
        <div className="ui segment">
          <div id="map" ref="map" className="ui map-fitting" />
        </div>
      </div>
    );
  }
}

export default GeoMap;
