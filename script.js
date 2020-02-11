// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
var lat = '';
var lon = '';
// var arr;
function showlocation() {
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
    const url = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxDistance=10&key=200681842-da90e5231d773b9b92835e9dc121c36e';
    // alert(url);
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        // var trail = Http.responseText;

        var trails = JSON.parse(Http.responseText);
        var arrS = trails['success'];

        var arr = trails['trails'];
        console.log(arr.length);

        // alert(arr.length);
        if (arrS == '1' && arr.length > 0) {

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
                if (col[i] != "id") {
                    var th = document.createElement("th");
                    th.innerHTML = col[i].toUpperCase();
                    tr.appendChild(th);
                }
            }

            for (var i = 0; i < arr.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < 9; j++) {
                    if (col[j] != "id") {
                        var tabCell = tr.insertCell(-1);
                        if (col[j] == 'url') {
                            tabCell.innerHTML = "<a href=\"" + arr[i][col[j]] + "\" target=\"_blank\">" + arr[i][col[j]] + "";
                        } else {
                            tabCell.innerHTML = arr[i][col[j]];
                        }
                    }
                }
            }

            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

        }
        else {
            alert('No data for this location.');
        }

    }

}