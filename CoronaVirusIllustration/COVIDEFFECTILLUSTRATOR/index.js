const latitude=[];
const longitude=[];
const infected=[];
const dead=[];
const sick=[];
const recovered=[];
const place=[];

async function updatemap(){

    try{
        let response= await fetch('./coronadata.json');
        let rsp= await response.json();
        const countries=rsp.data;
        //console.log(countries);

        //populate lattitude and longitude and mark on map
        countries.forEach(element => {
            latitude.push(element.latitude);
            longitude.push(element.longitude);
            infected.push(element.infected);
            dead.push(element.dead);
            sick.push(element.sick);
            recovered.push(element.recovered);
            place.push(element.name);
        });
        markmap();
    }catch(error){
        return null;
    }
}
// console.log(latitude,longitude);
function markmap(){
    console.log("Updating map......");

    for(let i=0;i<latitude.length;i++){
        if(infected[i]>255)
            color="rgb(255,0,0)";
        else
            color=`rgb(${infected[i]},0,0})`;
        const str=`LOCATION: ${place[i]}, INFECTED: ${infected[i]}, DEAD: ${dead[i]}, SICK: ${sick[i]}, RECOVERED: ${recovered[i]}`;

        new mapboxgl.Marker({draggable:false,color:color}).setLngLat([longitude[i],latitude[i]]).setPopup(new mapboxgl.Popup({offset: 25}).setHTML(str)).addTo(map);
    }
}

//update map with real-time data
// setInterval(updatemap, 5000);
updatemap();