import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function CategoryCard({category}) {
  return (
    <Link to={'/category/'+category} style={{textDecoration:'none',color:'black'}}>
    <Card
      className="text-white "
      style={{
        padding:'0px',
        width: '200px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';

       
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';

        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
        <Card.Title style={{ color:'black',fontSize: '16px', display:'flex',}} >{category}</Card.Title>

    </Card>
    </Link>
  );
}

export default CategoryCard;