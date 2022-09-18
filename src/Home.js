import { useState,useEffect } from 'react'
import db from './fb';
import { get,ref,child,remove } from 'firebase/database';

function Home(){
    const [info,setInfo] = useState([]);
    useEffect(() => {
        //here I am creating a database reference, this db I get from the fb I made
        const dbref = ref(db);
        //this get allows you to access the database
        //you are telling firebase to give access to a child
        //there could be many children in
        //so you need to mention which child do you want
        get(child(dbref,"task/"))
        //snapshot basically has the entire data in task child
        .then((snapshot)=>
        {
                if(snapshot.exists()){
                    setInfo([]);
                    const data = snapshot.val()
                    //this data you receive is basically an object
                    console.log(data);
                    if(data !== null)
                    {
                        Object.values(data).map((da)=>{
                            setInfo((oldArray) => [...oldArray,da]);
                        });
                    }
                }
                else
                {
                    console.log("No data");
                }
        })
    },[])
    const delTask = (id) =>{
        remove(ref(db,"task/"+id))
        .then(() =>{
            alert("Removed");
            window.location.reload();
        })
        .catch((err) =>{console.log(err)})
    }
    return(
        <>
            <center>
                <h1>Home Page</h1>
                <table border="4" style={{ width:"60%"}}>
                    <tr>
                        <th>Id</th>
                        <th>Task</th>
                        <th>Delete</th>
                    </tr>
                    {
                        info.map((e => 
                            <tr style={{"textAlign":"center"}}>
                                <td>{e.id}</td>
                                <td>{e.task}</td>
                                <td><button onClick={()=>{if(window.confirm("Are you sure?"))delTask(e.id)}}>Delete</button></td>
                            </tr>
                        
                        ))}
                </table>
            </center>
        </>
    );
}
export default Home;
