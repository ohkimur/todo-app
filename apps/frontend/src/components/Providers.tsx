import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

interface IProvidersProps {
  children?: React.ReactNode
}

export const Providers = ({ children }: IProvidersProps) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  )
}
