import React from 'react'
import "./Hero.css"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="container">
        <div className="main">
        <h1>The Art of Testing</h1>
        <p>The big day finally comes… and it’s terrible. Sure, the application looks great, and its features are fantastic. However, the app is riddled with embarrassing bugs. Users aren’t satisfied and the reviews are unforgiving.

How could this be prevented? The answer is, of course, software testing.</p>
        <div className="btns">
            <div><a href="https://github.com/Suvankar621/Chrome-extension" target='_blank' rel="noreferrer" ><button className='Download'>Download Now</button></a></div>
            <div>  <Link to={"/test"}> <button className='visit'>Visit Now</button></Link></div>
            
          
           
        </div>
        </div>
       

        <img src="hero.jpg" alt="" />
    </div>
  )
}

export default Hero