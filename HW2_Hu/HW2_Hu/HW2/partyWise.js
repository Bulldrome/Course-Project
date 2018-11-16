        $(document).ready(function () {
            
                $("#senators").html('');
                $.ajax({
                    type: "GET",
                    url: "partyList.xml",
                    dataType: "xml",
                    success: function (ResponseText) {
                        
                        $(ResponseText).find('senator').each(function () {
                            var name = $(this).find('name').text();
                            var party = $(this).find('party').text();
                            window.localStorage.setItem(name, party);                    
                        })
                        
                    }
                });
                updateDOMItems();
            });
    function removeItem(e){
        var name = document.getElementById("name").value;

        window.localStorage.removeItem(name);

        updateDOMItems();
    }
    var src, target1, target2;
    var sourceId;

   function updateDOMItems(){
        var itemsList = document.getElementById("senators");
        itemsList.innerHTML = '';
        for(name in window.localStorage){
            if(localStorage[name]=="false"){
            addItemToDOM(name);
            }
            else if(localStorage[name]=="Democrat")
            {addItemToDemocrat(name);
            }else if(localStorage[name]=="Republican"){
            addItemToRepublicans(name);
            }
        }
    }


   function addItemToDOM(name){
    var items = document.getElementById("senators");
    var item = document.createElement("li");
    item.id=name;
    
    var target1 = document.getElementById("democratArea");
    target1.ondrop = dropHandler;
    var target2 = document.getElementById("republicansArea");
    target2.ondrop = dropHandler2;
    item.draggable = true;
    item.innerHTML = name;
    items.appendChild(item);
   }

   function addItemToDemocrat(name){
    var items = document.getElementById("senators");
    var item = document.createElement("li");
    item.id = name;
    item.draggable = true;
    item.innerHTML = name;
    items.appendChild(item);
   }

   function addItemToRepublicans(name){
    var items = document.getElementById("Democrat");
    var item = document.createElement("li");
    item.id = name;
    item.draggable = true;
    item.innerHTML = name;
    items.appendChild(item);
   }

   function init(){
    src = document.getElementById("senators");
    target1 = document.getElementById("democratArea");

    src.ondragstart = dragStartHandler;
    src.ondragend = dragEndHandler;

    target1.ondrop = dropHandler1;
   }




   function dragStartHandler(e){
    e.dataTransfer.setData("Text", e.target.id);
    sourceId = e.target.id;
    e.target.classList.add("dragged");
   }
    
    function dragEndHandler(e) {
        var elems = document.querySelectorAll(".dragged");
        for(var i = 0;i<elems.length; i++){
            elems[i].classList.remove("dragged");
        }
    
    }


   function dropHandler(e) {
       console.log("Drop on" + e.target.id + "source is" + e.dataTransfer.getData("Text"));

       var id = e.dataTransfer.getData("text")||sourceId;
       var sourceElement = document.getElementById(id);
       var newElement = sourceElement.cloneNode(false);
       target.innerHTML = "";
       target.appendChild(newElement);
       e.preventDefault();
   }
   function dropHandler2(e){

   }