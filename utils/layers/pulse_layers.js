import React from 'react';

export const LAYERS_PLANET_PULSE = [
  {
    label: 'Forests',
    layers: [
      {
        label: 'Active Fires (VIIRS)',
        id: '5ca12eec-f8fe-49eb-b353-67c9eeb5bc6a',
        '3d': false,
        descriptionPulse:
          <div className="description">
            Fires in the past 7 days affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">Population density</button>
          </div>,
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        widgets: ['d409858d-9beb-4df5-ae48-bc0d6e9cda25'],
        basemap: {
          url: 'https://api.mapbox.com/styles/v1/resourcewatch/cj1erey1c00ia2rqmvh6htv3x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w'
        }
      },
      {
        label: 'Brazilian Amazon Deforestation Alerts',
        id: '17b9bf19-e116-4a22-b71a-fe67ce7fd552',
        '3d': false,
        descriptionPulse:
          <div className="description">
            Deforestation alerts in the past 7 days affecting <button className="c-button -secondary layer-button" data-layer-id="cbb309b7-1df1-4638-b821-48db53053d38">Intact forest landscapes</button> and <button className="c-button -secondary layer-button" data-layer-id="dabcca67-037c-4d11-afc4-69559edec4dc">Protected areas</button>
          </div>,
        contextLayers: ['cbb309b7-1df1-4638-b821-48db53053d38', 'dabcca67-037c-4d11-afc4-69559edec4dc'],
        widgets: ['5f5f7899-ccd2-4477-aa7e-43805880eb33']
      },
      {
        label: 'GLAD Deforestation Alerts',
        id: '5b19ee01-1de5-4f65-ad5d-b7d58e487cc5',
        '3d': false,
        descriptionPulse:
          <div className="description">
            Deforestation alerts in the past 7 days affecting <button className="c-button -secondary layer-button" data-layer-id="cbb309b7-1df1-4638-b821-48db53053d38">Intact forest landscapes</button> and <button className="c-button -secondary layer-button" data-layer-id="dabcca67-037c-4d11-afc4-69559edec4dc">Protected areas</button>
          </div>,
        contextLayers: ['cbb309b7-1df1-4638-b821-48db53053d38', 'dabcca67-037c-4d11-afc4-69559edec4dc'],
        widgets: ['5f5f7899-ccd2-4477-aa7e-43805880eb33']
      }
    ]
  },
  {
    label: 'Water',
    layers: [
      {
        label: 'Current floods',
        id: '80d2665b-bba4-4de9-ba5e-d0487e920784',
        '3d': false,
        descriptionPulse:
          <div className="description">
            Current floods affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">Population density</button>
          </div>,
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        widgets: ['279f8f52-83df-417d-a32e-f433c49e3288']
      },
      {
        label: 'Coral Reef Bleaching Alerts',
        id: '73db724d-87b9-41cd-912a-b66eb65eebdd',
        '3d': false,
        descriptionPulse:
          <div className="description">
            Bleaching alerts affecting <button className="c-button -secondary layer-button"data-layer-id="5522b6ee-66d5-4d2d-9109-ae8e6b7e3a26">coral reefs</button>
          </div>,
        contextLayers: ['5522b6ee-66d5-4d2d-9109-ae8e6b7e3a26'],
        widgets: ['279f8f52-83df-417d-a32e-f433c49e3288']
      }
    ]
  },
  {
    label: 'Food',
    layers: [
      {
        label: 'Current and Projected Food Insecurity',
        id: '0ac7bf69-388a-48b0-a869-c3240031c4bf',
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        '3d': false,
        descriptionPulse:
          <div className="description">
            Current and projected food insecurity affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">population</button>
          </div>
      }
    ]
  },
  {
    label: 'Disasters',
    layers: [
      {
        label: 'Significant Earthquakes over the past 30 Days',
        id: '5939b34f-42bb-4861-bd4a-308a0ae7a1d6',
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        '3d': true,
        markerType: 'bar',
        widgets: ['b3065d7e-b63b-40e2-9dd1-b95ad8e5aee1'],
        descriptionPulse:
          <div className="description">
            Significant earthquakes over the past 30 days affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">population</button>
          </div>
      },
      {
        label: 'Weekly Volcano Report',
        id: '667ae321-649e-4caa-b761-35e370c776b0',
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        '3d': true,
        markerType: 'volcano',
        descriptionPulse:
          <div className="description">
            Volcanoes over the past 7 days affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">population</button>
          </div>
      },
      {
        label: 'Landslide Hazard Alerts',
        id: '50ef9f99-ddca-46b9-bb69-690f0b2ced88',
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        '3d': false,
        widgets: ['279f8f52-83df-417d-a32e-f433c49e3288'],
        descriptionPulse:
          <div className="description">
            Landslide hazard alerts affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">population</button>
          </div>
      }
    ]
  },
  {
    label: 'Society',
    layers: [
      // {
      //  label: 'Conflict and Protest Events in African States',
      //  id: 'b508a5f8-28f2-41c6-b0f7-eac918083062',
      //  contextLayers: [],
      //  '3d': false,
      //  markerType: 'default'
      // },
      // {
      //  label: 'Conflict and Protest Events in Asian States',
      //  id: '029b6b49-dd20-4172-8842-6cbba6bdaf87',
      //  contextLayers: [],
      //  '3d': false,
      //  markerType: 'default'
      // },
      // {
      //  label: 'Global Database of Events, Language, and Tone',
      //  id: 'b51c7412-cb4d-4dab-8eeb-8cc31c131195',
      //  contextLayers: [],
      //  '3d': false,
      //  markerType: 'default'
      // },
      {
        label: 'Migrant Deaths',
        id: 'b51c7412-cb4d-4dab-8eeb-8cc31c131195',
        contextLayers: [],
        '3d': false
      }

    ]
  },
  {
    label: 'Climate',
    layers: [
      {
        label: 'Air Quality - PM 2.5',
        id: '52a0250f-ae97-462d-b8fb-995e3d8fc084',
        contextLayers: [],
        '3d': false,
        widgets: ['349aae2c-d39f-4a9f-8a90-3fe7f73a25ce']
      },
      {
        label: 'Air Quality - PM 10',
        id: '1002c7f6-78f7-4fde-a8c3-ba8f8abf2b7f',
        contextLayers: [],
        '3d': false,
        widgets: ['349aae2c-d39f-4a9f-8a90-3fe7f73a25ce']
      },
      {
        label: 'Air Temperature Anomolies',
        id: '1002c7f6-78f7-4fde-a8c3-ba8f8abf2b7f',
        contextLayers: ['84229e01-4e61-4c08-a7dd-efb7259dd85d'],
        '3d': false,
        widgets: ['349aae2c-d39f-4a9f-8a90-3fe7f73a25ce'],
        descriptionPulse:
          <div className="description">
            Air temperature anomalies affecting <button className="c-button -secondary layer-button"data-layer-id="84229e01-4e61-4c08-a7dd-efb7259dd85d">population</button>
          </div>
      }
    ]
  }
];
