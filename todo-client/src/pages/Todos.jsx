import { useDispatch, useSelector } from 'react-redux'
import * as uuid from 'uuid';
import List from '../components/List';
import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import Status from '../components/Status';
import { useState } from 'react';
import { actionDeleteTodo, actionEditTodo, actionSetEdit, addTodo, setFilter } from '../redux/action/todo';

export default function Todos(){
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(null);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClickFilter = (e) => {
        const dataFilter = e.target.dataset.filter;
        if(state.filter === dataFilter) return
        dispatch(setFilter(dataFilter))
    }

    const setEdit = (id) => {
      if(state.editId === id ) return 
      const targetEditIndex = state.todo.findIndex((todo) => todo.id === id);
      setInputValue(state.todo[targetEditIndex].name)
      dispatch(actionSetEdit(id));
    }

    const submit = () => {
      if(!inputValue) {
        setError('Input Value tidak boleh kosong');
        return
      }
      setError(null);
      if(state.editId){
        dispatch(actionEditTodo({id : state.editId, name: inputValue}));
        dispatch(actionSetEdit(null));
        return 
      }else{
        const randId = uuid.v4();
        dispatch(addTodo({id: randId, name: inputValue, status: 'active' }))
      }
      setInputValue('');
    }

    const deleteTodo = (id) => {
      dispatch(actionDeleteTodo(id))
    }

    const completeTodo = (id,status) => {
      let currentStatus = 'active';
      if(currentStatus === status){
        currentStatus = 'complete'
      }
      dispatch(actionEditTodo({id, status: currentStatus }))
    }

    return (
        <Container>
          <div className='w-full flex flex-col items-center pt-16'>
            <h2 className='font-bold text-3xl'>What's the plan for today?</h2>
            {error && <span className='text-red-600 font-bold'>{error}</span>}
            <div className='w-full flex justify-between items-center mt-10 gap-4'>
              <Input value={ inputValue } onChange={(e)=> setInputValue(e.target.value)} className='flex-1' />
              <Button onClick={submit}>{state.editId ? "Update" : "Add"}</Button>
              {state.editId && <Button onClick={() => dispatch(actionSetEdit(null))}>Cancel</Button>}
            </div>
            <div className='mt-12 w-full'>
              <div className='flex gap-2'>
                <Status onClick={handleClickFilter} data-filter="all" isActive={state.filter === "all"}>ALL</Status>
                <Status onClick={handleClickFilter} data-filter="active" isActive={state.filter === "active"}>ACTIVE</Status>
                <Status onClick={handleClickFilter} data-filter="complete" isActive={state.filter === "complete"}>COMPLETED</Status>
              </div>
              <div className="my-5 flex flex-col gap-2">
                { state.todo.length === 0 ? "Empty Todo" : state.todo.map((todo) => (
                  (todo.status === state.filter || state.filter === 'all') && 
                  <List 
                    key={todo.id} 
                    todo={todo.name}
                    onComplete={() => completeTodo(todo.id, todo.status)}
                    onEdit={() => setEdit(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                    isComplete={todo.status === "complete"}
                  /> ))
                }
              </div>
            </div>
          </div>
        </Container>
      )
}
