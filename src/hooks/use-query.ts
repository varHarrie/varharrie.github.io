import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useQuery() {
  const [search] = useSearchParams();
  const query = useMemo(() => Object.fromEntries(search.entries()), [search]);

  return query;
}
