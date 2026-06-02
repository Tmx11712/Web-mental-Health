import { createContext, useContext, useState, useEffect } from "react";
import { apiUrl } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // On mount, if token exists, fetch user data
    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch(apiUrl("/user"), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                // Token invalid
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }
        } catch {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch(apiUrl("/login"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(
                data.message || data.errors?.email?.[0] || "Login gagal",
            );
        }
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const register = async (name, email, password, password_confirmation) => {
        const res = await fetch(apiUrl("/register"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            const firstError = data.errors
                ? Object.values(data.errors)[0]?.[0]
                : data.message;
            throw new Error(firstError || "Registrasi gagal");
        }
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        try {
            await fetch(apiUrl("/logout"), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
        } catch {
            // ignore
        }
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
