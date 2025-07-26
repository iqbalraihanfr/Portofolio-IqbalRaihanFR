import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Construction, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="text-center space-y-6 p-8 max-w-md mx-auto">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Construction className="h-24 w-24 text-orange-500 animate-pulse" />
            <div className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Page Not Found
          </h2>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <p className="text-lg text-orange-600 font-medium">
            This page is under development
          </p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist yet or is currently being built.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact me
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
