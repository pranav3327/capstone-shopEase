import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                login(data.user, data.token);
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ minHeight: '80vh' }}>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-5 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-900 opacity-10 blur-[100px]"></div>
            </div>

            <div className="auth-card">
                <div className="text-center mb-10">
                    <h2 className="heading-xl mb-2 text-3xl">Welcome Back</h2>
                    <p className="text-muted">Sign in to access your exclusive collection</p>
                </div>

                {error && (
                    <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="input-field w-full py-3 px-4 bg-[var(--bg-body)] border-[var(--border)] focus:border-[var(--accent)] transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-400">Password</label>
                            <a href="#" className="text-xs text-[var(--accent)] hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            className="input-field w-full py-3 px-4 bg-[var(--bg-body)] border-[var(--border)] focus:border-[var(--accent)] transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full py-3 text-lg font-bold tracking-wide shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-[var(--accent)] font-medium hover:underline">
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
