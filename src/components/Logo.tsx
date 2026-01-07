export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center h-9 w-9 rounded-md bg-white text-gray-900 font-black tracking-tighter">R</div>
      <div className="ml-1 flex items-center justify-center h-9 w-9 rounded-md bg-white text-gray-900 font-black tracking-tighter">F</div>
      <div className="ml-1 flex items-center justify-center h-9 w-9 rounded-md bg-white text-gray-900 font-black tracking-tighter">F</div>
    </div>
  )
}
