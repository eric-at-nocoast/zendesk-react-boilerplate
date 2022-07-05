import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@zendeskgarden/react-theming';
import {GlobalContextProvider} from '../context/Global';
import {DEFAULT_LOCALE} from '../lib/constants';
import I18n from '../lib/i18n';
import ErrorBoundary from './ErrorBoundary';
import Main from './Main';
import {Theme} from './Theme';

class App {
	constructor(client, appData) {
		this._client = client;
		this._appData = appData;

		this.states = {};

		// this.initializePromise is only used in testing
		// indicates app initilization(including all async operations) is complete
		this.initializePromise = this._initTicketSidebar();
	}


	async _initTicketSidebar() {
		let currentUser = null;
		let ticketSubject = '';

		try {
			const [user, subject] = await Promise.all([
				this._client.get('currentUser'),
				this._client.get('ticket.subject')
			]);

			currentUser = user.currentUser;
			ticketSubject = subject['ticket.subject'];
		} catch (e) {
			this._handleError.call(this, e);
		}

		const locale = currentUser ? currentUser.locale : DEFAULT_LOCALE;

		this.states.currentUser = currentUser;
		this.states.locale = locale;
		this.states.ticketSubject = ticketSubject;

		this.states.ticketId = this._appData.context.ticketId;

		I18n.loadTranslations(locale);

		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContextProvider
						value={{ticketSidebar: this._client}}
					>
						<ThemeProvider theme={Theme}>
							<Main data={this.states} />
						</ThemeProvider>
					</GlobalContextProvider>
				</ErrorBoundary>
			</StrictMode>,
			document.querySelector('.main')
		);
	}


	/**
	 * Handles error
	 * @param {Object} error error object
	 */
	_handleError(error) {
		console.error(
			`Retriving data returned with the following error: `,
			error.status,
			error.statusText
		);
	}


	_renderTicketSideBar() {
		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContextProvider
						value={{ticketSidebar: this._client}}
					>
						<ThemeProvider theme={Theme}>
							<Main data={this.states} />
						</ThemeProvider>
					</GlobalContextProvider>
				</ErrorBoundary>
			</StrictMode>,
			document.querySelector('.main')
		);
	}
}

export default App;
