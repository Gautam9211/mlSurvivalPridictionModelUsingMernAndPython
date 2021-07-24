import React,{useState} from 'react';
import '../index.css';
import axios from 'axios';

const Dataform = ()=>{
    
    const [ePassengerId,setePassenger] =useState('')
    const [Pclass,setPclass] = useState('')
    const [Sex,setSex] =useState('Male')
    const [Age,setAge] =useState('')
    const [SibSp,setSibSp] =useState('')
    const [Parch,setParch] =useState('')
    const [Fare,setFare] =useState('')
    const [Embarked_S,setEmbarked_S] =useState('')
    const [Embarked_C,setEmbarked_C] =useState('')
    const [Embarked_Q,setEmbarked_Q] =useState('')
    const [allEntry,setAllEntry] =useState([])
    const [userData, setUserData] = useState([]);

    const send = (e)=>{
        e.preventDefault();
        const newEntry  = {ePassengerId:ePassengerId,Pclass:Pclass,Sex:Sex,Age:Age,
        SibSp:SibSp,Parch:Parch,Fare:Fare,Embarked_S:Embarked_S,Embarked_C:Embarked_C,
        Embarked_Q:Embarked_Q}
        setAllEntry([newEntry])
        const config = {
            data : allEntry,
            header:{
                "context-type": "application/json"
            },mode: "cors"
        }
       
        axios.post("http://localhost:9000/data",config).then(response => {
            console.log(response.data)
            setUserData(response.data.slice(-5));
          }).catch(error => {
            console.log(error);
          })
          
        }
    return(
     <>
    
                <div className="container">
            <form action="post"  onSubmit={send} >
            <div className="row">
                <div className="col-25">
                <label htmlFor="ePassengerId">ePassengerId</label>
                </div>
                <div className="col-75">
                    <input type="text" id="ePassengerId" name="ePassengerId" placeholder="ePassengerId" value={ePassengerId} onChange= {(e)=>{
                        setePassenger(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="Pclass">Pclass</label>
                </div>
                <div className="col-75">
                <input type="text" id="Pclass" name="Pclass" placeholder="Pclass" value={Pclass} onChange= {(e)=>{
                        setPclass(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
            <div className="col-25">
                <label htmlFor="Sex">Sex</label>
                </div>
                <div className="col-75">
                    <select value = {Sex} onChange={(e)=>{
                        setSex(e.target.value)
                    }}>
                    <option value="Male">Male</option> 
                    <option value="Female">Female</option> 
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="Age">Age</label>
                </div>
                <div className="col-75">
                <input type="text" id="Age" name="Age" placeholder="Age" value={Age}  onChange= {(e)=>{
                        setAge(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="SibSp">SibSp</label>
                </div>
                <div className="col-75">
                <input type="text" id="SibSp" name="SibSp" placeholder="SibSp" value={SibSp}  onChange= {(e)=>{
                        setSibSp(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="Parch">Parch</label>
                </div>
                <div className="col-75">
                <input type="text" id="Parch" name="Parch" placeholder="Parch" value={Parch} onChange= {(e)=>{
                        setParch(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="Fare">Fare</label>
                </div>
                <div className="col-75">
                <input type="text" id="Fare" name="Fare" placeholder="Fare" value={Fare}  onChange= {(e)=>{
                        setFare(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="Embarked_S">Embarked_S</label>
                </div>
                <div className="col-75">
                <input type="text" id="Embarked_S" name="Embarked_S" placeholder="Embarked_S" value={Embarked_S}  onChange= {(e)=>{
                        setEmbarked_S(e.target.value)
                    }} required/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="Embarked_C">Embarked_C</label>
                </div>
                <div className="col-75">
                <input type="text" id="Embarked_C" name="Embarked_C" placeholder="Embarked_C" value = {Embarked_C}onChange= {(e)=>{
                        setEmbarked_C(e.target.value)
                    }} required/>
                </div>
                
            </div>

            <div className="row">
                <div className="col-25">
                <label htmlFor="Embarked_Q">Embarked_Q</label>
                </div>
                <div className="col-75">
                <input type="text" id="Embarked_Q" name="Embarked_Q" placeholder="Embarked_Q" value = {Embarked_Q} onChange= {(e)=>{
                        setEmbarked_Q(e.target.value)
                    }} required/>
                </div>
                
           
            <button type = "submit" >Predict</button>    
            </div>
   </form>
        <h2> Predicted value is : {userData}</h2>
            </div>

  </>
    )
}
export default Dataform
