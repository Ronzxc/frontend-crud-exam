import 'styles/main.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Page } from 'components/Pages';
import Home from 'views/home';
import Users from 'views/users';
import UsersProvider from 'util/ProvideUsers'; 
import { ModalSwitch } from 'components/UsersModal/ModalSwitch';
import NotFound from 'components/Pages/NotFound';

function App() {
	return (
		<UsersProvider> 
			<div className='app'>
				<Router>
					<Page>
						<Switch>
							<Route exact path='/'>
								<Home />
							</Route>
							<Route path='/users'>
								<Users />
							</Route>
							<Route path='*'>
								<NotFound />
							</Route>
						</Switch>
					</Page>
					<ModalSwitch />
				</Router>
			</div>
		</UsersProvider>
	);
}

export default App;
