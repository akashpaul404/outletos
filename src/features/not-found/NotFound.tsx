import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
            >
                <div className="mb-8">
                    <span className="text-9xl font-bold text-muted-foreground/20">404</span>
                </div>
                <h1 className="mb-2 text-3xl font-semibold">Page Not Found</h1>
                <p className="mb-8 text-muted-foreground">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                    <Button asChild>
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
