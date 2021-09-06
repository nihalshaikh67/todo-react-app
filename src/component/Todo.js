import React, { useState } from 'react';
import logo from '../images/logo.png'
import '../App.css'

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const[toggleSubmit,setToggleSubmit] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert("Please Write Something..")
        } 
        else if(inputData && !toggleSubmit ){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEditItem){
                        return { ...elem,name:inputData}
                    }
                    return elem;
                })
                
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null)
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData("");
        }
    }

    const deleteItem = (index) => {

        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        })
        setItems(updatedItems);
    }

    const editItem = (id) => {
     let newEditItem = items.find((elem)=>{
         return elem.id === id;
     });
    
     setToggleSubmit(false);
     setInputData(newEditItem.name);
     setIsEditItem(id)
     

    }
    const removeAll = () => {
        setItems([]);
    }
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={logo} alt="logo" />
                        <figcaption>Add your List Here ✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ?  <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :  <i className="fa fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }

                       
                    </div>
                    <div className="showItems">


                        {
                            items.map((element, index) => {
                                return (
                                    <div className="eachItem" key={element.id}>
                                        <h3>{element.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(element.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(element.id)}></i>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
