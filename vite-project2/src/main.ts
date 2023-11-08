import $  from "jquery"; 
import { Collapse, Modal } from 'bootstrap'
import {Coin} from "./types.js"
import { Fetch, service} from "./Fetch.js";

let coins:Coin[] = [
  {
      id: "01coin",
      symbol: "zoc",
      name: "01coin"
  },
  {
      id: "0chain",
      symbol: "zcn",
      name: "Zus"
  },
  {
      id: "0-knowledge-network",
      symbol: "0kn",
      name: "0 Knowledge Network"
  },
  {
  id: "0vix-protocol",
  symbol: "vix",
  name: "0VIX Protocol"
},
{
  id: "0x",
  symbol: "zrx",
  name: "0x Protocol"
},
{
  id: "0x0-ai-ai-smart-contract",
  symbol: "0x0",
  name: "0x0.ai: AI Smart Contract"
},
{
  id: "0x1-tools-ai-multi-tool",
  symbol: "0x1",
  name: "0x1.tools: AI Multi-tool"
},
{
  id: "0xauto-io-contract-auto-deployer",
  symbol: "0xa",
  name: "0xAuto.io : Contract Auto Deployer"
},
{
  id: "0xcoco",
  symbol: "coco",
  name: "0xCoco"
}
];

// async function init(){
//   try{
//      //spiner
//      // showSpinner();
//      const allCoins = await  service.getAllCoins();
//     //  console.log(allCoins)
//     // generateCardsData(allCoins);
//   }  catch(error){
//      console.log( error);
//   }
//   finally{
//     //unput the spiner
//  //    hideSpinner();
//   }
// }
// init();



const cardRowContainer = document.getElementById("cardAll");

$(function(){
  console.log("ready!"); 'ready!'
   $('#container').on("click","button.btnInfo",  async function(event){
    console.log(this);
   
    const card = $(this).closest('.card');
    const id = card.attr('id');
    const coinData = await Fetch.get(`https://api.coingecko.com/api/v3/coins/${id}`, id);
    //debugger;
    // const data = await service.getMoreInfoById(id);
    // const data = {usd: '22', ils:'32', eur:'54'};
    coinData.usd = 0;
    card.find('.usd').text("usd:"+"$" + (coinData.usd !== undefined ? coinData.usd.toFixed(5) : "N/A"));
    card.find('.eur').text("eur:"+"€" + (coinData.eur !== undefined ? coinData.eur.toFixed(5) : "N/A"));
    card.find('.ils').text("ils:"+"₪" + (coinData.ils !== undefined ? coinData.ils.toFixed(5) : "N/A"));  
    card.find('.img2 img').attr('src', (coinData.image !== undefined ? coinData.image : "N/A"));
    

   
     
    
   // good one  
  //  const newImage = document.createElement("img");  
  //  newImage.src = coinData.image;
  //  const contain = card.find(".img2");
  //  contain.empty();
  //  contain.append(newImage);
   
    const bsCollapse = new Collapse(`#collapse${id}`,{
       toggle: false
    });
    bsCollapse.toggle();
   });
});

let arrOfFiveCurrencies:string[] = [];

// to check the status of the checkbox
$(function() {
  console.log("ready!"); 'ready!'

  $('.btnClose').on("click",  function(event){
    let myModal = Modal.getInstance('#modal_coin_remove_selection');
    let body = $("#coin_remove_selection_body");
    let id_to_add = body[0].dataset.idToAdd;
    //to unchecked the button
    $(document.getElementById(`toggle_${id_to_add}`)).find("[type='checkbox']").prop('checked',false);
    myModal.hide();
    
  })

  $('.btnSaveChanges').on("click",  function(event){
    
    let myModal = Modal.getInstance('#modal_coin_remove_selection');
    let body = $("#coin_remove_selection_body");
    let id_to_add = body[0].dataset.idToAdd;
  
    //const idRadio = $(this.parentElement.parentElement).find('.radioRadio:checked').val();
    const idRadio = $('#modal_body_selection_radio').find('.radioRadio:checked').val();
    console.log(`id radio: , ${idRadio}`)
   
    console.log('Array contents1:', arrOfFiveCurrencies);
    const indexToRemove = arrOfFiveCurrencies.indexOf(idRadio);
    console.log('Array contents:', arrOfFiveCurrencies);
    console.log(indexToRemove);
    if (indexToRemove !== -1) {
    //        // Remove the item from the array
        // Option no. 1: Replace the selected item with the new one
            //arrOfFiveCurrencies[indexToRemove] = id_to_add;
        // Option no. 2: Remove old item, push new item to end.
        arrOfFiveCurrencies.splice(indexToRemove, 1);
        arrOfFiveCurrencies.push(`${id_to_add}`);
    

        $(document.getElementById(`toggle_${idRadio}`)).find("[type='checkbox']").prop('checked',false);

    }
    console.log('after slice from modal: ', arrOfFiveCurrencies)
    myModal?.hide();
    //myModal.dispose();
    // to unchecked the button
    //  checkbox.prop('checked', false);
  });    

  

   $('#container').on("click",'.boxToggle', function(event) {
    // Find the checkbox element inside the clicked boxToggle div
    const checkbox = $(this).find("[type='checkbox']");
    // const id_to_add = this.parentElement?.parentElement?.id;
    const id_to_add = this.parentElement?.id;
    console.log(`The ID of the clicked element is: ${id_to_add}`);
    // Alternatively, if .card is a sibling of .boxToggle, you can use:
    // const card = $(this).siblings('.card');
    // Check the state of the checkbox
    const isChecked = checkbox.prop('checked');
    if (isChecked) {
      console.log("The checkbox is checked.");
      // Do something when the checkbox is checked
      const MAX_SELECTED = 5;
      if(arrOfFiveCurrencies.length < MAX_SELECTED){
        arrOfFiveCurrencies.push(`${id_to_add}`);
    

      } else {
        // Too many selected. Pop up the modal.

        let allIdLabelCoin = generateModalBody(arrOfFiveCurrencies);
        console.log(allIdLabelCoin);
        const htmlString = allIdLabelCoin.outerHTML;
     
        let body = $("#coin_remove_selection_body");
        body.html(`${htmlString}`);
        body[0].dataset.idToAdd = id_to_add;
  
        const myModal = new Modal('#modal_coin_remove_selection',{});
        myModal.show();
      }  
      
    } else {
      console.log("The checkbox is not checked.");
      // Do something when the checkbox is  turn to not checked
     // Find the index of the item to remove from the array based on the id
      const indexToRemove1 = arrOfFiveCurrencies.indexOf(id_to_add);
      console.log(` index of arr in toggle check: ${indexToRemove1}`)
      if (indexToRemove1 !== -1) {
        //        // Remove the item from the array
               arrOfFiveCurrencies.splice(indexToRemove1, 1);
             }
           console.log(`after slice from modal: ${arrOfFiveCurrencies}`);
    } 

  });
});

const searchField = document.getElementById('inputSearch'); 
 console.log(searchField?.value);


$('.searchBtn').on("click",  function(event){
  // Clear any existing content in the container element
 const cardRowContainer = document.getElementById('cardAll'); 
 cardRowContainer.innerHTML = "";

 const filteredCard = getExactMatchFilterCurrency(coins,searchField?.value);
 console.log(filteredCard);
 if(filteredCard !== undefined){
   cardRowContainer?.appendChild(filteredCard); 
 }
 
});

  
function showAllCardsOfCoin(arrOfTheCoins:any){
  coins.forEach(coin => {
    const cardBig = generateCardOfCoin(coin);
    cardRowContainer?.appendChild(cardBig);
  });
};

showAllCardsOfCoin(coins);


function generateCardOfCoin(coin:any) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col-12", "col-md-5", "col-lg-3");
  
  cardDiv.innerHTML = `
        
       <div class="card" style="width: 250px;" id="${coin.id}">
        <div class="card-body" id="${coin.name}">
          
         <div class="boxToggle" class="btn btn-primary">
  
           <div class="form-check form-switch theId" id= "toggle_${coin.name}">
            <input class="form-check-input text-end" type="checkbox" >
           </div>
         </div>

        
  
          <h5 class="card-title"> ${coin.symbol}</h5>
          <p>id: ${coin.id}</p>
          <p>name: ${coin.name}</p>
               
          <p>
            <button class="btn btn-primary btnInfo" type="button" > 
            More Info
            </button>
          </p> 
         
         <div class="collapse" id= "collapse${coin.id}">
          <div class="card card-body">
            <div class="img2">
              <img id="img2Once" src="1">
            </div>
            <div class="ils"></div>
            <div class="usd"></div>
            <div class="eur"></div>
           </div>
          </div> 
  
        </div>
       </div>       
  `;
  return cardDiv;
  }

function generateModalBody(arrLabels:string[]){
     let allLabel:HTMLDivElement = document.createElement("div");
     allLabel.id = "modal_body_selection_radio";
     let arrOfLabel:string[] = arrLabels.map( arrLabel =>`  
     
     <div class="form-check1">
       <input class="form-check-input radioRadio" type="radio" name="exampleRadios" 
        value="${arrLabel}"  checked="checked">  ${arrLabel}
     </div>   
       `);

     allLabel.innerHTML = arrOfLabel.join(``);
   return allLabel;
  }

function getExactMatchFilterCurrency(arrOfCoins:Coin[], idOfCoin:any){
  if(idOfCoin === "All" || idOfCoin === "all" || idOfCoin === undefined || idOfCoin ===  ""){
    
      console.log("empty")
      showAllCardsOfCoin(coins);

    return;
}
  const exactMatches = arrOfCoins.filter(coin => coin.symbol.toLocaleLowerCase() === idOfCoin.toLocaleLowerCase());
  console.log('the exact match:' ,exactMatches); 
  console.log(exactMatches[0].id)

  const cardByFilteredInput = document.createElement("div");
  cardByFilteredInput.innerHTML = `
        
  <div class="card" style="width: 250px;" id="${exactMatches[0].id}">
   <div class="card-body">
     
    <div class="boxToggle"    class="btn btn-primary">
      <div class="form-check form-switch theId" id= "toggle_${exactMatches[0].id}">
      <input class="form-check-input text-end" type="checkbox" >
      </div>
    </div>

     <h5 class="card-title"> ${exactMatches[0].symbol}</h5>
     <p>id: ${exactMatches[0].id}</p>
     <p>name: ${exactMatches[0].name}</p>
          
     <p>
       <button class="btn btn-primary btnInfo" type="button" > 
       More Info
       </button>
     </p> 
    
    <div class="collapse" id= "collapse${exactMatches[0].id}">
     <div class="card card-body">
       <img class="img2">
       <div class="ils"></div>
       <div class="usd"></div>
       <div class="eur"></div>
      </div>
     </div> 

   </div>
  </div>       
`;
return cardByFilteredInput;
}

// Function to show the spinner
function showSpinner() {
  $('#spinner').show();
}

// Function to hide the spinner
function hideSpinner() {
  $('#spinner').hide();
}


$('#spinnerButton').on("click", function (event) {
  // Show the spinner
  showSpinner();

  // Simulate a delay for demonstration purposes (replace this with your actual operation)
  setTimeout(function () {
    // Your code logic here

    // Hide the spinner when the operation is complete
    hideSpinner();
  }, 1000); // Simulated 2-second delay
});






  

 
 



   

   
       
      


  








  
 
  
  






  
 