import { LOGOS } from '@start-jr/assets';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <img 
        src={LOGOS.main} 
        alt="Start Jr." 
        className="h-12 w-auto"
      />
      <h1 className="text-4xl font-bold text-start-jr-blue">Welcome Back</h1>
    </div>
  )
}

export default App
