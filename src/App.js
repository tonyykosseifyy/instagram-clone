import "./styles.css";
import Navbar from './Components/Navbar' ;
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom' ;
import './styles.css' ;
import Body from './Components/Body' ;
import Login from './Components/Login' ;
import './styles.css' ;
import { useSelector } from 'react-redux' ;
import { Redirect } from 'react-router-dom'
import UserProfile from './Components/UserProfile' ;

export default function App() {
	const dark = useSelector(state  => state.darkTheme )
	const userDisplayName = useSelector(state => state.user.displayName) ;
	console.log(userDisplayName , 'user in App ')
  return (
    <Router>
		<div className='app' style={{background : dark && 'black'}}>
			<Switch>
				
				<Route path='/sign-in' >
					<Login />
				</Route>
				{ /*userDisplayName ? null : <Redirect to='/sign-in' /> */}

				<Route path='/user/:userId' >
					<Navbar />	
					<UserProfile />
				</Route>

				<Route path='/' >
					<Navbar />
					<Body />
				</Route>

			</Switch>
		</div>
    </Router>
  )
} ;
