'use client'
import { useAuth } from '@/hooks/useAuth'
import { RoleBasedAccess } from '@/component/RoleBasedAccess'
import { logoutAdmin } from '@/lib/firebase/auth'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
        return <div>Loading...</div>
    }

    const handleLogout = async () => {
        await logoutAdmin()
        router.push('/admin/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Restaurant Admin</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <RoleBasedAccess ownerOnly>
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-4">Owner Controls</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                                Manage Staff
                            </button>
                            <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                                Financial Reports
                            </button>
                        </div>
                    </div>
                </RoleBasedAccess>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Daily Operations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                            Menu Management
                        </button>
                        <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                            Inventory
                        </button>
                        <button className="p-4 text-left bg-gray-50 rounded hover:bg-gray-100">
                            Daily Reports
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}