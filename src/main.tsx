import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { RouterProvider } from 'react-router';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
			<NextUIProvider>
				<NextThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
					<RouterProvider router={router} />
				</NextThemeProvider>
			</NextUIProvider>
  </React.StrictMode>,
);