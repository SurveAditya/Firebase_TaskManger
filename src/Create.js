import { useState } from 'react';
import db from './fb';
import { ref,set } from "firebase/database";
import { uid } from "uid";

function Create(){
        const [task,setTask] = useState("");
        const hTask = (event)=>{ setTask(event.target.value);}
        const save = (event)=>{
            event.preventDefault();
            let id = uid();
            let data = { id , task };
            let r = ref(db,"task/"+id)
            set(r,data);
            alert("Task Saved");
        }
        return(
            <>
                <center>
                    <h1>Create Page</h1>
                    <form onSubmit={save}>
                        <textarea placeholder="Enter the task" rows={7} cols={30} onChange={hTask} value={task}></textarea>
                        <br /><br />
                        <input type="submit" value="Save" />
                    </form>
                </center>
            </>
        );
}
export default Create;