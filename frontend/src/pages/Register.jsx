import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import instance from '../api/AxiosConfig'
const Register = () => {
    const [username, setUsername] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            id: Date.now(),
            username,
            mobile, 
            password,
            isAdmin: false
        }
        try {
            instance.post("/users",user).then((response) => {
                console.log(response)
                localStorage.setItem("user", JSON.stringify(response.data))
                navigate("/login")
            }).catch((err) => {
                console.error("Registration error:", err)
            });
        } catch (error) {
            console.error("Registration error:", error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Mobile</label>
                    <input 
                        type="text" 
                        placeholder="Mobile" 
                        className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Register
                </button>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Register