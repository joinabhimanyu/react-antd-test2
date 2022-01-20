import {data} from './constants'

export const fetchStudentsList = ()=>new Promise((resolve)=>{
    setTimeout(() => {
        resolve({data})
    }, 2000);
})