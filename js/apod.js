//function that gets called after button click action from index.html
  //api key given by nasa. hiow to not expose api key in code?
let nasa_api_key="BIpGQgeUrKXbXEN2hZc6q04Hho3bWP0KszNfKtaV";
let weather_api_key="3H5DK4WLA5DUHYHA77PT87G68";

function submitForm() {

      var input = document.getElementById("inputdate").value;
      var formatteddate= new Date(input);
      // formatting the date to remove the time part
      let datetext= input.toString();
      let dateArray=datetext.split("T");
      let api_inputdate=dateArray[0];
      document.getElementById("displayWeather").innerHTML='';

      //request to APOD

     
      //building request url.  is there a better way for this?
      let url="https://api.nasa.gov/planetary/apod?api_key="+nasa_api_key+"&date="+api_inputdate+"&thumbs=true";
      const req = new XMLHttpRequest();
      //opening request with aync option true
      req.open("GET",url,true);
      req.responseType ="json";

    //  sending request
  
      req.send();
      //initilaizing all fields to blank again
      document.getElementById("myImage").src='';
      document.getElementById("heading").textContent="";
      document.getElementById("explanation").innerHTML="";
      document.getElementById("displayError").innerHTML="";
      //once request is loaded, if the status is done, and status is successful then display the image.  if there is error, display the error message
      //in corresponding div element.
      req.onload = () => {

      

        if (req.readyState === XMLHttpRequest.DONE) {
              const status = req.status;
              if (status === 0 || (status >= 200 && status < 400)) {
     // The request has been completed successfully
                  //   console.log(req.responseText);
                     let response_json=req.response;
                     console.log(response_json);
                     console.log(req.status);

                    console.log(response_json.date," ",response_json.hdurl);
                    imgurl=response_json.hdurl;
                  //  console.log(imgurl);
                    imagetitle=response_json.title;
                    explanation=response_json.explanation;


                    document.getElementById("myImage").src=imgurl;


                    document.getElementById("heading").textContent=imagetitle;
                    document.getElementById("explanation").innerHTML=explanation;
   } else {
     // Oh no! There has been an error with the request!
     
     let errorjson=req.response;
     console.log(errorjson.msg);
    document.getElementById("displayError").innerHTML=errorjson.msg;
   }
 }


};



      //return input
}

function clearAllFields(){
  document.getElementById("myImage").src='';
  document.getElementById("heading").textContent="";
  document.getElementById("explanation").innerHTML="";
  document.getElementById("displayWeather").innerHTML= "";
  
}
function checkWeather() {
        // code to get the date same. Can this be done only once globally?  how?
          var input = document.getElementById("inputdate").value;
          var formatteddate= new Date(input);
          // formatting the date to remove the time part
          let datetext= input.toString();
          let dateArray=datetext.split("T");
          let api_inputdate=dateArray[0];
          let zipcode = document.getElementById("zip").value;

          if (!zipcode){
            clearAllFields();
   
            document.getElementById("displayWeather").innerHTML= " You must enter zip code to get weather details"
          }else{
            
            clearAllFields();
            document.getElementById("displayResult").innerHTML='';
            document.getElementById("displayError").innerHTML='';
            //request to APOD
            //api key given by visual crossing weather api: https://www.visualcrossing.com/weather/weather-data-services
            
            //building request url.  is there a better way for this?
            const req = new XMLHttpRequest();
            let url="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+zipcode+"/"+api_inputdate+"/"+api_inputdate+"?unitGroup=metric&include=days&key="+weather_api_key+"&contentType=json";


            req.open("GET",url,true);
            req.responseType ="json";

            req.send();
            req.onload = () => {

              if (req.readyState === XMLHttpRequest.DONE) {
                    const status = req.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
           // The request has been completed successfully
              let res=req.response;
           console.log(res.days[0]["description"]);
           console.log(res.address);



           document.getElementById("displayWeather").innerHTML= " Weather conditions for zipcode:"+res.address+" on Day:"+api_inputdate +" : <br> "+res.days[0]["description"] +"<br> <br>Moon phase:  " + res.days[0]["moonphase"]  ;

           console.log(api_inputdate);


                   } else {


                        document.getElementById("displayError").innerHTML= " You must enter zip code to get weather details"
                    // Oh no! There has been an error with the request!
                //    let errorjson=req.response;
                  //  console.log(errorjson.msg);
                //   document.getElementById("displayError").innerHTML=errorjson.msg;
                   }
            }

          }


       };


}

function displayMarsImage() {

  
//   //api key given by nasa. hiow to not expose api key in code?
  
//   //building request url.  is there a better way for this?
//   let url="https://api.nasa.gov/planetary/apod?api_key="+api_key+"&date="+api_inputdate+"&thumbs=true";
//   const req = new XMLHttpRequest();
//   //opening request with aync option true
//   req.open("GET",url,true);
//   req.responseType ="json";

// //  sending request

//   req.send();
//   //initilaizing all fields to blank again
//   document.getElementById("myImage").src='';
//   document.getElementById("heading").textContent="";
//   document.getElementById("explanation").innerHTML="";
//   document.getElementById("displayError").innerHTML="";
//   //once request is loaded, if the status is done, and status is successful then display the image.  if there is error, display the error message
//   //in corresponding div element.
//   req.onload = () => {

  

//     if (req.readyState === XMLHttpRequest.DONE) {
//           const status = req.status;
//           if (status === 0 || (status >= 200 && status < 400)) {
//  // The request has been completed successfully
//               //   console.log(req.responseText);
//                  let response_json=req.response;
//                  console.log(response_json);
//                  console.log(req.status);

//                 console.log(response_json.date," ",response_json.hdurl);
//                 imgurl=response_json.hdurl;
//               //  console.log(imgurl);
//                 imagetitle=response_json.title;
//                 explanation=response_json.explanation;


//                 document.getElementById("myImage").src=imgurl;


//                 document.getElementById("heading").textContent=imagetitle;
//                 document.getElementById("explanation").innerHTML=explanation;
// } else {
//  // Oh no! There has been an error with the request!
 
//  let errorjson=req.response;
//  console.log(errorjson.msg);
// document.getElementById("displayError").innerHTML=errorjson.msg;
// }
// }


// };



  //return input
}