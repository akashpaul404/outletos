import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, SearchX } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <SearchX className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="text-8xl font-bold tracking-tight text-muted-foreground/30">404</h1>
        
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Page not found
        </h2>
        
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="mt-8">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
