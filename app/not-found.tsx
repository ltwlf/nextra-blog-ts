import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                <Link
                    href="/"
                    className="btn btn-lg rounded-full px-8"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
