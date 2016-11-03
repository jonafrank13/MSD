var sample;
var catalogue_view;
var catMap = {"Id":"id","Name":"name","Catagory":"cat","Price":"price","Score":"score"};

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
    catalogue_view = new Vue({
      el: '#catalogue',
      data: {
        products:sample.products,
        filter_data:"",
        searchModifier:"id",
        sortModifier:"id",
        order:1,
        perPage:3*3,
        pageNo:1
      },
      methods:{
        loaded:function(){
          event.target.previousElementSibling.style.display="none";
        },
        missingHandler:function(){
          event.target.src = "img/notfound.png"
        }
      },
      computed: {
        total_count:function(){
            return this.perPage*this.pageNo;
        }
      }
    });
}

window.onscroll = function() {
    document.getElementById('to-top').style.visibility="visible";
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight-2) {
      catalogue_view.pageNo+=1;
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

function showSearchDropdown(){
    document.getElementById('search-dropdown').style.visibility="visible";
}

function hideSearchDropdown(){
    document.getElementById('search-dropdown').style.visibility="hidden";
}

function showSortDropdown(){
    document.getElementById('sort-dropdown').style.visibility="visible";
}

function hideSortDropdown(){
    document.getElementById('sort-dropdown').style.visibility="hidden";
}

function updateFilterSelector(id){
    document.getElementById("filter-selector").innerHTML = id.replace("search-","")+"<i></i>";  
    catalogue_view.searchModifier = catMap[id.replace("search-","")];
}

function updateSortSelector(id){
    document.getElementById("sort-selector").innerHTML = id.replace("sort-","")+"<i></i>";  
    catalogue_view.sortModifier = catMap[id.replace("sort-","")];
}

function updateFilterString(){
    catalogue_view.filter_data = document.getElementById('filter-string').value;
}

function sort(){
    catalogue_view.order *= -1;
}