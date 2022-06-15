import React,{useState,useEffect} from 'react'
import axios from 'axios';
import classNames from 'classnames';

export default function GrocerySection() {
   /*-----------------------UseState-------------*/
    const[groceryItemInput, updateGroceryItemInput] = useState("");
    const[groceryItemList,updateGroceryItemList]   = useState([])
   /*-----------------------UseState End-------------*/

   /*-----------------------UseEffect-------------*/
   async function getGroceryItems(){
      console.log("server url",);
    try{
        const response = await axios.get
        (`${process.env.REACT_APP_SERVER_URL}/groceryItems/list`);
        // console.log('response', response);
        //updateGroceryItemInput("");
        updateGroceryItemList([...response.data.result]);
    }catch(e){
        console.log("Some Error occured while lisiting",e);
    }

   }
    useEffect(()=>{
        getGroceryItems();
  },[])
  
   /*-----------------------UseEffect End-------------*/



    /*-------------------Getting month------------------*/
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        const d = new Date();
        let CurrentMonth = month[d.getMonth()];
/**=================  END MONTH------------------------ */
    
async function addGroceryItem(){
          try{
              const response = await axios.post
              (`${process.env.REACT_APP_SERVER_URL}/groceryItems/add`,{
                 itemName: groceryItemInput,
                 isPurchased: false,
              });
              console.log('response', response);
              updateGroceryItemInput("");
              getGroceryItems();


          }catch(e){
              console.log("Some Error occured while adding")
          }
      }
       function handleKeyDown(event) {
        if(event.key === "Enter") {
            console.log("Enter Key Passes");
            addGroceryItem()
        }
    }
    /*--------Update Purchase Status------------*/
   async function updatePurchaseStatus(_id){
    try{    
    const response = await axios.put
        (`${process.env.REACT_APP_SERVER_URL}/groceryItems/update`,{
           _id: _id,
           
        });
        console.log("response", response);
        getGroceryItems();
    }catch(err){
        console.log("Some Error occured while Updating",err)
    }
    }
    /*--------Update Purchase Status END------------*/

    async function deleteItem(_id){
         try{

            const response = await axios.delete
            (`${process.env.REACT_APP_SERVER_URL}/groceryItems/delete`,
            {
              data:{ _id: _id,}
               
            });
            console.log("response", response);
            getGroceryItems();

         }catch(err){
        console.log("Some Error occured while Deleting",err)
         }
    }

    /*--------Render Items Start------------*/

     function renderGroceryItems(){
        console.log("groceryItemList",groceryItemList);
         return groceryItemList.map((groceryitem)=>{
             return <div key={groceryitem.itemName} className="bg-blue-100 w-80 h-10 
             border rounded border-indigo-700 
             flex justify-center items-center px-2"
             >
              <span className={classNames({'line-through':groceryitem.isPurchased === true,
              })}
              >
              {groceryitem.itemName}
              </span>
              <div className="ml-auto">
              
              <button className="  bg-indigo-500 opacity-100  
              border rounded px-2 py-1 mr-2"
              onClick={() =>updatePurchaseStatus(groceryitem._id)}
              >Purchased</button>
             
              <button className=" bg-indigo-500 opacity-100  
              border rounded px-2 py-1"
              onClick={()=> deleteItem(groceryitem._id)}
              >X</button>

              </div>


            </div>
         })
    }
    /*--------Render Items Start------------*/

    return (
    <div className="w-full h-96 flex justify-center items-center flex-col">
        <span className="text-2xl font-bold animate-bounce">Plan for the month of data {CurrentMonth}</span>
        <div className="box">
            <input className="grocery-items-input
            border-2 
            border-teal-400 border-dashed  rounded w-80 h-10" 
            type="text" 
            placeholder="Add Grocery Items"
            value={groceryItemInput}
            onChange={(event)=>(updateGroceryItemInput(event.target.value))}
            onKeyDown={handleKeyDown}
            />
            
        </div>
        
                <div className="">
                
                <br/>
                    {renderGroceryItems()}
                    
                </div>
    </div>
  )
}
