export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
        <p className="text-cyan-400 font-mono tracking-wider animate-pulse">[LOADING...]</p>
      </div>
    </div>
  );
}
