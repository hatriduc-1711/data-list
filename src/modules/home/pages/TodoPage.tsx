import React, { MutableRefObject, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useStore } from 'react-redux';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { FcSearch } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { IoClose, IoCheckmarkDoneOutline, IoCheckmark } from 'react-icons/io5';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import '../../../scss/todoPage.scss';
import { AppState } from '../../../redux/reducer';
import { addTodo, deleteTodo, editTodo, toggleCompletedTodo } from '../../../redux/todoApp/todoAppActions';
import { ITodo } from '../../../models/todo';

const TodoPage = () => {
    const [search, setSearch] = useState<string>('');
    const [addNameTodo, setAddNameTodo] = useState<string>('');
    const [editValue, setEditValue] = useState<string>('');
    const [select, setSelect] = useState<string>('1');
    const [showInputAdd, setShowInputAdd] = useState<boolean>(false);
    const [showInputEdit, setShowInputEdit] = useState<boolean>(false);
    const refInputAdd = useRef() as MutableRefObject<HTMLInputElement>;
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const store = useStore().getState().todoApp;

    let todoListRemaining: ITodo[] = store.todoList;

    useLayoutEffect(() => {
        todoListRemaining = todoListRemaining.filter((todo) => {
            return (
                todo.name.includes(search) &&
                (select !== '1' && select === '2' ? todo.completed === true : todo.completed === false)
            );
        });
    }, [search, select]);

    useEffect(() => {
        if (showInputAdd) refInputAdd.current.focus();
    }, [showInputAdd]);

    const handleAdd = () => {
        dispatch(
            addTodo({
                id: uuidv4(),
                name: addNameTodo,
                completed: false,
            }),
        );
        setAddNameTodo('');
        refInputAdd.current.focus();
    };

    const handleToggleCompleted = (id: string) => {
        dispatch(toggleCompletedTodo(id));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id));
    };

    const handleEdit = (name: string) => {
        dispatch(editTodo(name, editValue));
        setShowInputEdit(false);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div className="wrapper">
                <h2>TODO LIST</h2>
                <div className="wrapper-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        spellCheck={false}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="icon-search">
                        <FcSearch />
                    </div>
                </div>
                <div className="button-container">
                    <button className="button-add-task" onClick={() => setShowInputAdd(!showInputAdd)}>
                        Add task
                    </button>
                    <select className="select" value={select} onChange={(e) => setSelect(e.target.value)}>
                        <option value="1">All</option>
                        <option value="2">Completed</option>
                        <option value="3">To do</option>
                    </select>
                </div>
                <div className={`input-add-task-container ${showInputAdd ? 'show-input-add' : ''}`}>
                    <input
                        type="text"
                        placeholder="Add"
                        value={addNameTodo}
                        ref={refInputAdd}
                        onChange={(e) => setAddNameTodo(e.target.value)}
                    />
                    <button className="button-add" onClick={handleAdd}>
                        <IoCheckmarkDoneOutline />
                    </button>
                    <button className="button-close" onClick={() => setShowInputAdd(false)}>
                        <IoClose />
                    </button>
                </div>
                <ul className="list-task">
                    {todoListRemaining.length === 0 && <p style={{ textAlign: 'center', margin: 0 }}>empty</p>}
                    {todoListRemaining.map((todo: ITodo) => {
                        return (
                            <li className="task-item" key={todo.id}>
                                <div className="name-task">
                                    <div
                                        className={`checkbox ${todo.completed ? 'check' : ''}`}
                                        onClick={() => handleToggleCompleted(todo.id)}
                                    >
                                        {todo.completed && <IoCheckmark />}
                                    </div>
                                    {showInputEdit ? (
                                        <input
                                            type="text"
                                            autoFocus={true}
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                    ) : (
                                        <div className="name">{todo.name}</div>
                                    )}
                                </div>
                                <div className="button-options">
                                    {showInputEdit ? (
                                        <>
                                            <button className="button-confirm" onClick={() => handleEdit(todo.name)}>
                                                <IoCheckmarkDoneOutline />
                                            </button>
                                            <button
                                                className="button-close-input-edit"
                                                onClick={() => setShowInputEdit(false)}
                                            >
                                                <IoClose />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="button-delete" onClick={() => handleDelete(todo.id)}>
                                                <MdDelete />
                                            </button>
                                            <button
                                                className="button-edit"
                                                onClick={() => {
                                                    setShowInputEdit(true);
                                                    setEditValue(todo.name);
                                                }}
                                            >
                                                <FiEdit3 />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TodoPage;
