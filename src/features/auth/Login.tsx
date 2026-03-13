import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toast } from "@/components/ui/toast"
import { useAuthStore } from "@/store/authStore"
import { loginRequest } from "@/services/authService"

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const user = await loginRequest(data.email, data.password)
            login(user)
            navigate("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#f6f6f8] dark:bg-[#0a0a16]">
            {/* Background Blobs - Light Mode */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blob rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/40 blob rounded-full" />
            <div className="absolute top-[20%] right-[15%] w-[20%] h-[20%] bg-purple-200/50 blob rounded-full" />
            {/* Background Orbs - Dark Mode */}
            <div className="hidden dark:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary glowing-orb rounded-full" />
            <div className="hidden dark:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 glowing-orb rounded-full" />
            <div className="hidden dark:block absolute top-[20%] right-[15%] w-[20%] h-[20%] bg-purple-600 glowing-orb rounded-full" />

            <main className="relative z-10 w-full max-w-6xl px-6 py-12 lg:flex lg:items-center lg:gap-12">
                {/* Left Side: Branding */}
                <div className="hidden lg:flex flex-col flex-1 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">OutletOS</h1>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
                            Experience the future of <span className="gradient-text">outlet management.</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-xl max-w-md">
                            Manage your outlets, effortlessly. All your data in one beautiful, high-performance dashboard.
                        </p>
                    </div>
                </div>

                {/* Right Side: Login Card */}
                <div className="w-full lg:max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="glass-card rounded-xl p-8 lg:p-10 shadow-2xl"
                    >
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">OutletOS</span>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h3>
                            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    {...register("email")}
                                    disabled={isLoading}
                                    className="w-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 focus:border-primary transition-all"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-400 ml-1">{errors.email.message}</p>
                                )}
                            </div>
                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    disabled={isLoading}
                                    className="w-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 focus:border-primary transition-all"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-400 ml-1">{errors.password.message}</p>
                                )}
                            </div>
                            {/* Remember Me */}
                            <div className="flex items-center px-1">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            className="peer h-5 w-5 rounded border-white/20 bg-white/5 text-primary focus:ring-0 focus:ring-offset-0 transition-all checked:bg-primary"
                                            type="checkbox"
                                        />
                                    </div>
                                    <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">Remember me for 30 days</span>
                                </label>
                            </div>
                            {/* CTA Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 rounded-xl btn-gradient text-white font-bold text-base shadow-lg shadow-primary/25 hover:opacity-90 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="glass-card rounded-xl p-4 mt-6 text-sm text-slate-600 dark:text-slate-400">
                            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Demo Credentials:</p>
                            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                <p><span className="font-medium text-slate-900 dark:text-white">Admin:</span> admin@outletos.com / 123456</p>
                                <p><span className="font-medium text-slate-900 dark:text-white">Manager:</span> manager@outletos.com / 123456</p>
                                <p><span className="font-medium text-slate-900 dark:text-white">Staff:</span> staff@outletos.com / 123456</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer Links */}
                    <div className="mt-8 flex justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <a className="hover:text-slate-300 transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-slate-300 transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-slate-300 transition-colors" href="#">Help Center</a>
                    </div>
                </div>
            </main>

            {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        </div>
    )
}
