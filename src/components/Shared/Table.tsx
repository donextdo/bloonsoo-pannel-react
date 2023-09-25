import React from 'react'
import { FaSort } from 'react-icons/fa'

export const Table = ({ children }:any) => {
  return (
    <div className="overflow-x-auto relative h-[75vh] overflow-y-auto w-[85vw]">
    
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            { children }
          </table>
        
    </div>
  )
}

export const THead = ({ children }:any) => {
    return (
        <thead className="text-sm text-gray-700 border border-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                { children }
              </tr>
        </thead>
    )
}

export const TBody = ({ children }:any) => {
    return (
        <tbody className="bg-white overflow-y-auto">
            { children }
        </tbody>
    )
}

export const TH = ({ title,width }:any) => {
    return (
        <th scope="col" className="relative px-6 py-3 pr-8 font-medium tracking-normal whitespace-nowrap">
            <span className='mr-6'>
                { title }
            </span>
            
            <FaSort className='w-3 h-3 fill-gray-500 absolute right-6 top-0 bottom-0 my-auto'/>
        </th>
    )
}

export const Row = ({ children }:any) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            { children }
        </tr>
    )
}

export const TD = ({ children }:any) => {
    return (
        <td className="px-6 py-4 border-r border-l border-gray-100 whitespace-nowrap">
     
            { children }

        </td>
    )
}

// export const Table = ({ columns, data }:any) => {
//   return (
//     <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
//       <thead className="text-sm text-gray-700 border border-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//         <tr>
//           {columns.map((column:any, index:number) => (
//             <th key={index} className="relative px-6 py-3 pr-8 font-medium tracking-normal whitespace-nowrap">{column}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody className="bg-white overflow-y-auto">
//         {data.map((row:any, rowIndex:number) => (
//           <tr key={rowIndex}>
//             {columns.map((column:any, columnIndex:number) => (
//               <td key={columnIndex} className="px-6 py-4 border-r border-l border-gray-100 whitespace-nowrap">{row[column]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     )
// }