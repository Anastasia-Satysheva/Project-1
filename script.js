var lat = '';
var lon = '';
// var arr;
 function showlocation(){
    alert('asd');
}
    var x = document.getElementById("demo");    
    function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;


        const Http = new XMLHttpRequest();
        // const url='https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200681842-da90e5231d773b9b92835e9dc121c36e';
        const url='https://www.hikingproject.com/data/get-trails?lat=' + lat +'&lon=' + lon + '&maxDistance=10&key=200681842-da90e5231d773b9b92835e9dc121c36e';
        // alert(url);
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            // var trail = Http.responseText;

            var trails = JSON.parse(Http.responseText);
            var arrS = trails['success'];

            var arr = trails['trails'];
            console.log ( arr.length );

            // alert(arr.length);
            if(arrS == '1' && arr.length > 0){

                var col = [];
                for (var i = 0; i < arr.length; i++) {
                    for (var key in arr[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }

                var table = document.createElement("table");

                var tr = table.insertRow(-1);                 

                for (var i = 0; i < 9; i++) {
                    if(col[i] != "id"){
                        var th = document.createElement("th");    
                        th.innerHTML = col[i].toUpperCase();
                        tr.appendChild(th);
                    }
                }

                for (var i = 0; i < arr.length; i++) {

                    tr = table.insertRow(-1);

                    for (var j = 0; j < 9; j++) {
                        if(col[j] != "id"){
                            var tabCell = tr.insertCell(-1);
                            if(col[j] == 'url'){
                                tabCell.innerHTML = "<a href=\"" + arr[i][col[j]] + "\" target=\"_blank\">" + arr[i][col[j]] + "";
                            }else{
                                tabCell.innerHTML = arr[i][col[j]];
                            }
                        }
                    }
                }

                var divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
                            
            }
            else{
                alert ('No data for this location.');
            }

        }

    }
    
    function getLocationState() {
        
        // alert(lat + " :: " + lon);

        var x = document.getElementById("state").value;
        // alert(x);
        var urlS = "https://api.opencagedata.com/geocode/v1/json?q=" + x + "&key=43b8648811254a3ab4667ff51589ed49";
        // alert(url);

        const Http = new XMLHttpRequest();
        const url1 = urlS;
        // alert(url1);
        Http.open("GET", url1);
        Http.send();

        Http.onreadystatechange = (e) => {
            // var trail = Http.responseText;

            var states = JSON.parse(Http.responseText);
            // console.log(states['results'][0]['geometry']);

            var stateArr = states['results'][0]['geometry'];

            var lat = stateArr['lat'];
            var lon = stateArr['lng'];
            console.log(lat + " :: " + lon);


            //End State API

            const Http1 = new XMLHttpRequest();
            // const url='https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200681842-da90e5231d773b9b92835e9dc121c36e';
            const url='https://www.hikingproject.com/data/get-trails?lat=' + lat +'&lon=' + lon + '&maxDistance=50&key=200681842-da90e5231d773b9b92835e9dc121c36e';
            // alert(url);
            Http1.open("GET", url);
            Http1.send();

            Http1.onreadystatechange = (e) => {
                // var trail = Http.responseText;

                var trails = JSON.parse(Http1.responseText);
                var arrS = trails['success'];

                var arr = trails['trails'];
                console.log ( arr.length );

                // alert(arr.length);
                if(arrS == '1' && arr.length > 0){

                
                    
                    //aaaaaaaaaaaaaaaa
                    
                    var col = [];
                    for (var i = 0; i < arr.length; i++) {
                        for (var key in arr[i]) {
                            if (col.indexOf(key) === -1) {
                                col.push(key);
                            }
                        }
                    }

                    // CREATE DYNAMIC TABLE.
                    var table = document.createElement("table");

                    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

                    var tr = table.insertRow(-1);                   // TABLE ROW.

                    for (var i = 0; i < 9; i++) {
                        if(col[i] != "id"){
                            var th = document.createElement("th");      // TABLE HEADER.
                            th.innerHTML = col[i].toUpperCase();
                            tr.appendChild(th);
                        }
                    }

                    // ADD JSON DATA TO THE TABLE AS ROWS.
                    for (var i = 0; i < arr.length; i++) {

                        tr = table.insertRow(-1);

                        for (var j = 0; j < 9; j++) {
                            if(col[j] != "id"){
                                var tabCell = tr.insertCell(-1);
                                if(col[j] == 'url'){
                                    tabCell.innerHTML = "<a href=\"" + arr[i][col[j]] + "\" target=\"_blank\">" + arr[i][col[j]] + "";
                                }else{
                                    tabCell.innerHTML = arr[i][col[j]];
                                }
                            }
                        }
                    }

                
                    var divContainer = document.getElementById("showData");
                    divContainer.innerHTML = "";
                    divContainer.appendChild(table);
                                
                }
                else{
                    alert ('No data for this location.');
                
                }

            }

        }

    }