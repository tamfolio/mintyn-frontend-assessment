import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginUser, saveToken, LoginCredentials } from '@/lib/api';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      // Check if login was actually successful and has a token
      if (data.data && data.data.access_token) {
        // Save the token
        saveToken(data.data.access_token);
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // If no token in response, treat as error
        throw new Error(data.message || 'Login failed');
      }
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
    },
  });
}