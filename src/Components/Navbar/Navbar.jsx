import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping, faRightToBracket,faUser } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react';
import axios from 'axios';


function StoreNavbar() {
  const [search, setSearch]=useState('')
  const [results, setResults] = useState([]);
  const navigate = useNavigate();


  const islogin = localStorage.getItem('isLoggedIn')
  // console.log(islogin)

  const logOut=()=>{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('cartIds');
    localStorage.removeItem('cartQuantities');
    navigate('/login');
    // console.log("Logged out successfully");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      navigate('/search-results', { state: { searchResults: results } });
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    async function getSearchProducts() {
      if (search.trim() !== '') {
        try {
          const res = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
          setResults(res.data.products);
        } catch (err) {
          console.error("Search failed", err);
        }
      } else {
        setResults([]);
      }
    }
    getSearchProducts();
  }, [search]);

  useEffect(() => {
    if (search === '') {
      setResults([]);
    }
  }, [search]);



  
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100" style={{position:'fixed',top:'0',zIndex:'100'}}>
      <Container fluid>
        <Navbar.Brand><Link to='/' style={{textDecoration:'none',color:'black'}} >            <img src='/VACLOGO.png' alt="VAC Logo" style={{width: '50px'}} />
        VAC FASHION STORE</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
          <Form className="d-flex w-100 justify-content-between align-items-center" onSubmit={handleSubmit}>
            <div style={{width:'80%', display:'flex', justifyContent:'center', alignItems:'center',margin:'auto'}}>
            <Form.Control
              type="search"
              value={search}
              
              onChange={handleSearch}
              placeholder="Search for products,brands and more"
              className="me-2"
              style={{
                width:'40%',
                
              }}
              aria-label="Search"
            />
            <Button variant="none" type='submit'   style={{width:'1%',height:'38px'}}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
            </div>
            
            <div className='d-flex justify-content-end align-items-center  ' style={{width:'23%'}}>
            
            {islogin ? <Button variant="none"  className='mx-1 w-10 border border-1 border-dark' style={{height:'38px'}}><Link to='/profile' style={{textDecoration:'none',color:'black'}}><FontAwesomeIcon icon={faUser} /></Link></Button> :<Button variant="none" className='mx-1 w-10 border border-1 border-dark' style={{height:'38px'}}><Link to='/login' style={{textDecoration:'none',color:'black'}}><FontAwesomeIcon icon={faRightToBracket} /> Login</Link></Button> }

            {islogin ? <Button variant="none" onClick={logOut} className='mx-1 w-50 border border-1 border-dark' style={{height:'38px'}}>Log Out</Button> : <Button variant="none" className='mx-1 w-50 border border-1 border-dark' style={{height:'38px'}}><Link to='/register' style={{textDecoration:'none',color:'black'}}>New User</Link></Button>}
            
            

            
            <Button variant="none" className='mx-1 w-50 border border-1 border-dark' style={{height:'38px'}}><Link to='/mycart' style={{textDecoration:'none',color:'black'}}><FontAwesomeIcon icon={faCartShopping} /> My Cart</Link></Button>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
      {search !== '' ? (
  results.length > 0 ? (
    <div style={{
      position: 'absolute',
      top: '47px',
      left: '45.9%',
      transform: 'translateX(-50%)',
      background: '#fff',
      borderRadius: '5px',
      width: '26.8%',
      maxHeight: '300px',
      overflowY: 'auto',
      border: '1px solid #ccc',
      zIndex: 999,
      padding: '10px',
    }}>
      {results.map(product => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          style={{ textDecoration: 'none', color: 'black' }}
          onClick={() => setSearch('')}
        >
          <div style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>{product.title}</strong>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div style={{
      position: 'absolute',
      top: '47px',
      left: '45.9%',
      transform: 'translateX(-50%)',
      background: '#fff',
      borderRadius: '5px',
      width: '26.8%',
      border: '1px solid #ccc',
      zIndex: 999,
      padding: '10px',
      textAlign: 'center'
    }}>
      No products found
    </div>
  )
) : null}
    </Navbar>
  );
}

export default StoreNavbar;