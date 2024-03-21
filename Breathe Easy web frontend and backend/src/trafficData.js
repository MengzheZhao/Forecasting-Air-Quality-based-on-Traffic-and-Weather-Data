const fetch = require('node-fetch');

const api_url = "https://services.arcgis.com/CXBb7LAjgIIdcsPt/arcgis/rest/services/TMS_Telemetry_Sites/FeatureServer/0/query";

async function fetchData(url, params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`);
    const data = await response.json();
    return data;
}

async function getLatestDate() {
    try {
        const params = {
            'where': '1=1',
            'orderByFields': 'startDate DESC',
            'resultRecordCount': 1,
            'returnGeometry': 'false',
            'outFields': 'startDate',
            'f': 'json'
        };

        const data = await fetchData(api_url, params);

        if (data && data.features && data.features.length > 0) {
            const latestDate = formatDate(data.features[0].attributes.startDate);
            console.log("Latest Date:", latestDate);
            return latestDate;
        } else {
            console.error("No features found in API response:", data);
            throw new Error("No features found in API response.");
        }
    } catch (error) {
        console.error("Error fetching the latest date:", error);
        throw new Error("Unable to fetch the latest date.");
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function getTotalTrafficCountLight(regionName) {
    const latestDate = await getLatestDate();

    const params_light = {
        'where': `regionName='${regionName}' AND classWeight='Light' AND startDate='${latestDate}'`,
        'returnGeometry': 'false',
        'outFields': 'regionName,trafficCount',
        'f': 'json'
    };

    const dataLight = await fetchData(api_url, params_light);

    let totalTrafficCountLight = 0;

    if (dataLight.features && dataLight.features.length > 0) {
        dataLight.features.forEach(feature => {
            totalTrafficCountLight += feature.attributes.trafficCount || 0;
        });
    }

    return totalTrafficCountLight;
}

async function getTotalTrafficCountHeavy(regionName) {
    const latestDate = await getLatestDate();

    const params_heavy = {
        'where': `regionName='${regionName}' AND classWeight='Heavy' AND startDate='${latestDate}'`,
        'returnGeometry': 'false',
        'outFields': 'regionName,trafficCount',
        'f': 'json'
    };

    const dataHeavy = await fetchData(api_url, params_heavy);

    let totalTrafficCountHeavy = 0;

    if (dataHeavy.features && dataHeavy.features.length > 0) {
        dataHeavy.features.forEach(feature => {
            totalTrafficCountHeavy += feature.attributes.trafficCount || 0;
        });
    }

    return totalTrafficCountHeavy;
}

module.exports = {
    getTotalTrafficCountLight,
    getTotalTrafficCountHeavy
};
