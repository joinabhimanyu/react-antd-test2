import React from 'react';
import './App.css';
import StudentsListView from './StudentsList/StudentsListView';
import MenuPage from './MenuPage/Menu'
import Counter from './EmployeeList/EmployeeListView';
import ApplicationRoutes from './ApplicationRoutes';

export default function App() {
  return (
    <div className="App">
      <ApplicationRoutes/>
    </div>
  )
}

