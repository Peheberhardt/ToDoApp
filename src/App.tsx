import { Header } from './components/Header'
import './global.css'
import styles from './App.module.css';
import {PlusCircle, TagSimple} from 'phosphor-react'
import { Task } from './components/Task';
import { useState } from 'react';


export function App() {

  const [newTaskText, setNewTaskText] = useState('')
  const [finishTasks, setFinishTasks] = useState<number[]>([])
  const [tasks, setTasks] = useState([
    {
      id: 0,
      content: "" 
    },
  ])

  function handleCreateNewTask(){
    event?.preventDefault()
    
    setTasks([...tasks , {
      id: Math.max(... tasks.map(task => task.id )) + 1,
      content: newTaskText
    }])
    setNewTaskText('')
  }

  
  function handleNewTaskChange (event:any){
    setNewTaskText(event?.target.value)
  }

  function deleteTask(taskToDelete: number){
    const taskWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })
    setTasks(taskWithoutDeletedOne)
  }
  
  
  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <div>
          <div className={styles.newTask}>
            <form onSubmit={handleCreateNewTask}>
              <input type="text" placeholder='Adicione uma nova tarefa' name="task" onChange={handleNewTaskChange} value={newTaskText}/>
              <button title ="Criar nova tarefa" type="submit">
                Criar
                <PlusCircle size={18} weight='bold'/> 
              </button>
            </form>
          </div>
          <div className={styles.list} >
            <div className={styles.headerList}>
              <p className={styles.tarefasText}>Tarefas criadas <span>{tasks.length - 1}</span></p>
              <p className={styles.finalizadasText}>Concluídas <span>{finishTasks.length} de {tasks.length-1}</span></p>
            </div>

            <div className={styles.contentList}>
              {tasks.filter(task => task.id !==0).map(task => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    onDeleteTask={deleteTask}
                    setFinishTasks={setFinishTasks}
                    finishTasks={finishTasks}
                  />
                )
              })}
            </div>
          </div>
        </div>
        
      </main>
      
    </div>
  )
}
