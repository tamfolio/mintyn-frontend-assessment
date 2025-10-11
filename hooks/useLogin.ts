import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginUser, saveToken, LoginCredentials } from '@/lib/api';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      if (data.data && data.data.access_token) {
        saveToken(data.data.access_token);
        
        router.push('/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message);
    },
  });
}