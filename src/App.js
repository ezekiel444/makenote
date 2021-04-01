import {useReducer, useState} from 'react'
import {GrPin, GrFormClose} from 'react-icons/gr'
import './App.css';



const noteapp = []


const reducer = (state, action)=>{
  switch(action.type){

    case 'ADD':{
      return [...state, {textInput: action.payload.text, id: action.payload.id, rotate: Math.floor(Math.random() * 20)} ]
    }
    case 'DELETE':{
      return state.filter(note=>note.id !== action.payload.id)
    }

    default:return state
  }
}

function App() {

  const [userInput, setUserInput] = useState('')

  const [todos, dispatch] = useReducer(reducer, noteapp)

const handleAdd = (e)=>{
  if(!userInput) return
  dispatch({type:'ADD', payload:{text: userInput,  id: Math.random()}})

  setUserInput("")
}

const handleDragNote = (event)=>{
  event.target.style.left = `${event.pageX - 50}px`
  event.target.style.top = `${event.pageY - 50}px`
  
}

const handleDragPage = (event)=>{
  event.preventDefault()
  event.stopPropagation()
}


  return (
    <main className='noteapp' onDragOver={handleDragPage} >
      <section className="add-items">
      <input required type="text" placeholder='enter your notes...' onChange={e=>setUserInput(e.target.value)} />
    <button className='btn-add' onClick={handleAdd}>add note</button>
      </section>
    {todos.map(todo=>{
      return <div 
     draggable
    onDragEnd={handleDragNote}
       key={todo.id}
       style={{transform:`rotate(${todo.rotate}deg)`}} 
      className="item">
          <GrPin  className='pin'/>
          <GrFormClose  onClick={()=>dispatch({type:'DELETE', payload:{id:todo.id}})} className='close'/>
          {todo.textInput}
          </div>
    })}
    </main>
  );
}

export default App;
