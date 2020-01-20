var map = null;

function loadMap()
{
    var lon = 5.0;
    var lat = 20.0;
    var zoom = 2;
    var minZoom = 2;
    var maxZoom = 5;

    map = new L.map('map-container',
    {
        center: [lat, lon],
        minZoom: minZoom,
        zoom: zoom,
        scrollWheelZoom: false,
        fullscreenControl: true,
        fullscreenControlOptions:
        {
            position: 'topleft'
        }
    });

    // Stamen Maps. Layer Toner.
    var layer = new L.StamenTileLayer("toner");
    map.addLayer(layer);

    $.getJSON('datos/countries.geojson', function (geojson)
    {
        L.geoJson(geojson,
        {
            style: function (feature)
            {
                return {
                    'weight': 1,
                    'color': 'black'
                }
            }
        }).addTo(map);
    });

    var layer_working_paraguayans;
    var icon = new L.Icon(
    {
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    $.getJSON("datos/working_paraguayans.geojson", function(data_working_paraguayans)
    {
        layer_working_paraguayans = L.geoJson(data_working_paraguayans,
        {
            onEachFeature: onEachFeature,
            pointToLayer: function(feature, latlng)
            {
                return L.marker(latlng,
                {
                    title: feature.properties.name, 
                    icon: icon
                });
			}
		}).addTo(map);
    });
    
    // To capitalize
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

	// Show information in a popup.
	function onEachFeature(p_feature, p_layer) {
		if (p_feature.properties) {
            var v_popupString = '<div class="popup">';
            for (var k in p_feature.properties) {
                var v = p_feature.properties[k];
                // If the property is LinkedIn
                if (k === 'linkedIn'){
                    // And if the value is a link
                    if ((v[0] === 'w' & v[1] === 'w' & v[2] === 'w') || (v[0] === 'h' & v[1] === 't' & v[2] === 't' & v[3] === 'p')) {
                        // Put the link
                        v_popupString += `<b> ${capitalize(k)} </b>: <a href="${v}">${v}</a><br />`;
                    } else {
                        // Else put a string
                        v_popupString += '<b>' + capitalize(k) + '</b>: ' + v + '<br />';
                    }
                } else {
                    // Else put a string
                    v_popupString += '<b>' + capitalize(k) + '</b>: ' + v + '<br />';
                }
            }
            v_popupString += '</div>';
            p_layer.bindPopup(v_popupString);
        }

	}
}