import { DHConnectProvider } from '@daohaus/connect';
import { HausThemeProvider } from '@daohaus/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Routes } from './Routes';

const UtilityCSS = styled.div`
  .mb-xxl {
    margin-bottom: 6rem;
  }
  .mb-xl {
    margin-bottom: 4rem;
  }
  .mb-lg {
    margin-bottom: 3rem;
  }
  .mb-md {
    margin-bottom: 2rem;
  }
  .mb-sm {
    margin-bottom: 1rem;
  }
  .mb-xs {
    margin-bottom: 0.5rem;
  }
  .uppercase {
    text-transform: uppercase;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 20,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <DHConnectProvider>
          <QueryClientProvider client={queryClient}>
            <UtilityCSS>
              <Routes />
            </UtilityCSS>
          </QueryClientProvider>
        </DHConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
