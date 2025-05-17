import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - SocialNova',
  description: 'Sign in to your SocialNova account or create a new one.',
};

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-600">
            SocialNova
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Connect, Share, and Explore with SocialNova
          </p>
        </div>
        <div className="rounded-lg bg-white px-6 py-8 shadow-sm ring-1 ring-gray-900/5">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
