var catalogue_view;
var sample;
var perPage = 3*3;
var pageNo  = 1;

function callAjax(url, callback){
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function updateSampleData(data)
{
    sample = JSON.parse(data);
    var renderingData = {"products":sample.products.slice(0,perPage*pageNo)};
    catalogue_view = new Vue({
      el: '#catalogue',
      data: {
        products:renderingData.products,
        filter_data:"",
        modifier:"id",
        order:1
      },
      methods:{
        loaded:function(){
          event.target.previousElementSibling.style.display="none";
        },
        missingHandler:function(){
          event.target.src = "img/notfound.png"
        }
      }
    });
}

window.onscroll = function() {
    document.getElementById('to-top').style.visibility="visible";
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight-2) {
      pageNo+=1;
      catalogue_view.products = sample.products.slice(0,perPage*pageNo >= sample.length ? sample.length-1:perPage*pageNo);
    }
    if(window.scrollY == 0){
      document.getElementById('to-top').style.visibility="hidden";
    }
};

function toggleMenuCollapse() {
    var elem = document.getElementById("navbar");
    if (elem.className === "navbar") {
        elem.className += " responsive";
    } else {
        elem.className = "navbar";
    }
}

function showDropdown(){
    document.getElementById('search-dropdown').style.visibility="visible";
}

function hideDropdown(){
    document.getElementById('search-dropdown').style.visibility="hidden";
}

function updateFilter(id){
    document.getElementById("search-selector").innerHTML = id.replace("search-","")+"<i></i>";
    var catMap = {"search-Id":"id","search-Name":"name","search-Catagory":"cat","search-Price":"price","search-Score":"score"};
    catalogue_view.modifier = catMap[id];
    catalogue_view.products = sample.products.slice(0,perPage*pageNo >= sample.length ? sample.length-1:perPage*pageNo);
}

function updateFilterString(){
    catalogue_view.filter_data = document.getElementById('filter-string').value;
}

function sort(){
    catalogue_view.order *= -1;
}