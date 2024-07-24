import '@src/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { AppPropsWithLayout } from 'src/types/page';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider as ReactQueryProvider,
} from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@src/app/redux/store';
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const reactQueryClient = new ReactQueryClient();

  return (
    <ReactQueryProvider client={reactQueryClient}>
      <ReduxProvider store={store}>
        <ThemeProvider attribute="class">
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            {...pageProps}
          >
            {getLayout(<Component {...pageProps} />)}
          </ClerkProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ReactQueryProvider>
  );
}
