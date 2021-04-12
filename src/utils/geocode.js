const request= require('postman-request');


const geocode = (address , callback) => {
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieGN2aXNoYWwiLCJhIjoiY2tteGgwYWNzMGFubzJxa294YzIxYTZlcCJ9.1LjXMh-Z4Q2TDFmDhmT_og&limit=1`;
    
    request({url, json:true}, (error, { body } = {} ) => {
        if(error){
            callback('Unable to Connect to Geocode service');
        } else if (body.features.length == 0){
            callback('Unable to get the address. Try another search');
        }
        else{
            callback(undefined, {
                lattitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}




module.exports = geocode;