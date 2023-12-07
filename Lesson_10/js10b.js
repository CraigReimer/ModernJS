"use strict";
/*  JavaScript 7th Edition
    Chapter 10 - revised from Google Maps to Maquest
    Chapter revision

    Oak Top House Directions
    Author: Craig Reimer
    Date:   11-16-23

    Filename: js10b.js
*/

const btnDir = document.getElementById("directions");

window.onload = function () {


    // Setup API key and initialize the map
    L.mapquest.key = 'bTKwEqucLkieGWtozrrinbLvPdJj69Jj';
    let baseLayer = L.mapquest.tileLayer('map');

    // Note: 'map' refers to a <div> element with the ID map
    let map = L.mapquest.map('map', {
        center: [0, 0],
        layers: baseLayer,
        zoom: 12
      });


    // Add the Map layers control (map layer styles)
    L.control.layers({
        'Map': baseLayer,
        'Hybrid': L.mapquest.tileLayer('hybrid'),
        'Satellite': L.mapquest.tileLayer('satellite'),
        'Light': L.mapquest.tileLayer('light'),
        'Dark': L.mapquest.tileLayer('dark')
      }).addTo(map);



    // Map with Leaflet Draw Control
    var drawnItems = L.featureGroup().addTo(map);

    map.addControl(new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        poly: {
          allowIntersection: false
        }
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true
        }
      }
    }));

    map.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;

      drawnItems.addLayer(layer);
    });



    // Basic Geocoding
    L.mapquest.geocoding().geocode('1825 N Bluemound Dr, Appleton, WI');



    // Map Directions Click Event
    btnDir.addEventListener('click', () => {
        // Add switch to add and remove the directions panel
        switch (btnDir.value) {
            case "Map Directions":
                btnDir.value = "Hide Directions";
                // Map with a Directions Control
                L.mapquest.directionsControl({
                    routeSummary: {
                        enabled: false,
                        draggable: true
                    },
                    narrativeControl: {
                        enabled: true,
                        compactResults: false
                    },
                    routeRibbon: {
                        showTraffic: true
                    },
                    alternateRouteRibbon: {
                        showTraffic: true
                    }
                }).addTo(map);

                break;

            case "Hide Directions":
                btnDir.value = "Map Directions";
                location.reload();
                break; 
        }
    });



    // Add the Mapquest Control
      map.addControl(L.mapquest.control());



} // end .onload() event
