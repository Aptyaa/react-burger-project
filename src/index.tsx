import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { Provider } from 'react-redux';
import { store } from './app/services/store';
import './styles.css';
import { BrowserRouter as Router } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</StrictMode>
);
