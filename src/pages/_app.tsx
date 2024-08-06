import '@src/styles/globals.css';
import { AppPropsWithLayout } from 'src/types/page';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

// Configure the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      retryOnMount: true,
      staleTime: 10 * (60 * 1000), // 10 mins
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        {...pageProps}
      >
        <ToastContainer />
        <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
