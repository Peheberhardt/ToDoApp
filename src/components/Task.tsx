import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { useState } from 'react';

interface TaskProps{
    id : number,
    content: string,
    onDeleteTask: (arg: number) => void
    finishTasks: number[],
    setFinishTasks: React.Dispatch<React.SetStateAction<number[]>>
}


export function Task({content, onDeleteTask, id, setFinishTasks, finishTasks} : TaskProps){
    const [isChecked, setIsChecked] = useState(false)

    function handleDeleteTask(){
        onDeleteTask(id)
    }

    function handleCheckboxChange(event:any) {
        setIsChecked(event?.target.checked)
        if(finishTasks.includes(id)){
            const uncheckedTask:number[] = finishTasks.filter(task =>{
                return task !== id
            })
            setFinishTasks(uncheckedTask);
        } else{
            setFinishTasks([...finishTasks, id])
        }
        
    }

    
    return(
        <div className={isChecked ? styles.taskChecked: styles.task}>
            <label className={styles.content}>
                <div className={styles.switchWrapper}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                    <span className={styles.switch}></span>
                </div>
                <p className={isChecked ? styles.linethrough : ""}>{content}</p>
                <button onClick={handleDeleteTask} title='Deletar comentario'><Trash size={20}/></button>
            </label>
        </div>
    )
}