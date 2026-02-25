import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import '@/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6">
    <div className="flex gap-4">
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1 className="text-3xl font-bold">Vite + React</h1>
    <div className="card p-4 rounded shadow-lg flex flex-col items-center gap-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
    <p className="read-the-docs text-gray-500">
      Click on the Vite and React logos to learn more
    </p>
  </div>
  )
}

export default App
