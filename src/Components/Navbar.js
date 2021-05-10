import React, { useState , useEffect } from "react";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import HomeIcon from "@material-ui/icons/Home";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";
import { useSelector , useDispatch } from 'react-redux' ;
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { toggleTheme } from '../actions.js' ;
import { Link } from 'react-router-dom' ;
import Avatar from '@material-ui/core/Avatar' ;

const Navbar = () => {
  const user = useSelector(state => state.user)
	const dispatch = useDispatch() ;
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
	const dark = useSelector(state => state.darkTheme)
  const inputRef = React.useRef() ;
  useEffect(() => {
    if ( focus ) {
      inputRef.current.focus() ;
    }
  }, [focus])
  console.log(user , 'user in navbar')
  return (
    <nav style={{ background: dark && '#000000' , color: dark && 'white'}} >
      <div className="navbar-first">
        <img
		  src={
		!dark ?
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXm8H7K0a-4nYAwKUu57KI463WaS6BGR7NlFQT5jx05FUdK36UdWbyVyhJaQp6hZAMafM&usqp=CAU"
		:
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRerz5KY5miu__bFIeYn_URek2mLMZC44nCzLY48JpC5c5qaUBwvZ7DYWiJs9-k_viaBQA&usqp=CAU' }
          alt="instagram logo"
        />
        <form style={{background : dark && 'rgb(75, 74, 74)' , color: dark && 'white'}} >
          <input
              className="ab"
              type="text"
              onFocus={() => setFocus(true)}
              style={{ display: focus && 'none' , background : dark && 'rgb(75, 74, 74)' }}
            />
            <div className={`cover ${focus && 'go'}`} style={{ color : dark && 'white' }}>
				<SearchIcon
				style={{ color: dark ? "white" : "grey", height: "20px", width: "20px" }}
				/>
				<span>Search</span>
          	</div>
          <div style={{ width: "" }}>
            <SearchIcon
              style={{ color: "grey", height: "20px", width: "20px" }}
            />
            <input
              type="text"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={() => setFocus(false)}
              className={focus ? "focused" : undefined}
			  ref={inputRef}
			  style={{ background : dark && 'rgb(75, 74, 74)' , color: dark ? 'white' : 'black'}}
            />
          </div>
          <CancelRoundedIcon
            onClick={() => setInput("")}
            className="close-search"
            style={{
              background: dark ? 'transparent' : "#FAFAFA" ,
              cursor: "pointer",
              color: dark ? 'white' : "grey",
              height: "20px",
              width: "20px",
              display: !focus && "none"
            }}
          />
        </form>
        <div className="nav-links" style={{ fill : dark ? 'white' : 'black' , background: dark ? '#000000' : 'white' }}  >
			<IconButton>
        <Link to='/'>
				  <HomeIcon />
        </Link>
			</IconButton>
			<IconButton>
				<ExploreOutlinedIcon />
			</IconButton>
			<IconButton>
				<FavoriteBorderIcon />
			</IconButton>

			<IconButton onClick={() => dispatch(toggleTheme())} >
				<Brightness4Icon />
			</IconButton>
      
      <Link to='/account'>
      <IconButton className='avatar'>
        <Avatar className='avatar' src={user.photoURL ? user.photoURL : '' } alt={user?.displayName} />
      </IconButton>
</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
