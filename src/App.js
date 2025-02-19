import 'styles/main.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Page } from 'components/Pages';
import Home from 'views/home';
import Users from 'views/users';
import UsersProvider from 'util/ProvideUsers'; 

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
							<Route path='*'>404</Route>
						</Switch>
					</Page>
				</Router>
			</div>
		</UsersProvider>
	);
}

export default App;
