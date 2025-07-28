import React from 'react'

function Profile() {
  return (
    <div className='' style={{ marginTop: "56px", padding: "20px" ,height:'100vh',backgroundColor:'rgb(233,233,233)'}}>
      <div className='  d-flex justify-content-center align-items-center flex-column' style={{height:'100%',width:'100%',gap:'10px'}}>
        <div className='  d-flex justify-content-center flex-column p-5 align-items-center'style={{width:'80%',height:'30%',marginTop:'5%',backgroundColor:'white',borderRadius:'10px'}}>
            <div>
            <h1 className='text-center' >Personal Details</h1>
            </div>
            <div className='  d-flex justify-content-evenly p-5 align-items-center'style={{width:'100%',height:'100%'}}>
            <div>
                <img src='https://plus.unsplash.com/premium_photo-1731442837021-3929f70e1710?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFrZSUyMGElMjBwaWN0dXJlfGVufDB8fDB8fHww' width='300px' style={{borderRadius:'8px'}} />
            </div>
            <div>
                <h1 className='' style={{fontFamily:'copperplate'}}>Anil Chary</h1>
                <p className='p-0 m-0'>Ph no:</p>
                <p className='p-0 m-0'>Email:</p>
                <p className='p-0 m-0'>Gender:</p>
                <p className='p-0 m-0'>DOB:</p>
                
            </div>
            </div>
        </div>
        
        <div className=' d-flex  justify-content-center ' style={{width:'100%', height:'80%',gap:'10px'}}>
            <div className=' d-flex justify-content-center align-items-start p-5 flex-column ' style={{width:'20%', height:'80%',backgroundColor:'white',borderRadius:'10px'}}>
            <h4 className='p-0 m-0'>Orders</h4>
                <h4 className='p-0 m-0'>Account Setting</h4>
                <p className='p-0 m-0'>Profile Information</p>
                <p className='p-0 m-0'>Manage address</p>
                <p className='p-0 m-0'>Pan card Information</p>
                <h4 className='p-0 m-0'>My stuff</h4>
                <p className='p-0 m-0'> My coupons</p>
                <p className='p-0 m-0'>My Review & Ratings</p>
                <p className='p-0 m-0'>All notifications</p>
                <p className='p-0 m-0'>My wishlist</p>

            </div>
            <div className=' d-flex justify-content-center align-items-center' style={{width:'60%', height:'80%',backgroundColor:'white',borderRadius:'10px'}}>
                <h1>Name</h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
