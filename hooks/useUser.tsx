import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/lib/api';
import { ApiResponse } from '@/types';

interface UserProfile {
  id: number;
  email: string;
}

export function useUser() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => fetchData<ApiResponse<UserProfile>>('/auth/user'),
    select: (response) => response.data,
    enabled: true, 
  });
}