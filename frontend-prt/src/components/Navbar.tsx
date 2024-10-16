import { Link } from "react-router-dom";



const Navbar = ()=>{

    const menu = [
        { text: "Nature", path: "/" },
        { text: "Travel", path: "/" },
        { text: "Technologies", path: "/" },
        { text: "Politics", path: "/" },
      ];
    
    return(
      <div>
      {/* <Header></Header> */}
      <div className="border-b">
          <div className="px-5 py-5 flex justify-between">
              <Link to='/home'>
              <span className='font-extrabold text-2xl'>BLOGGER</span>
              </Link>
              <div className='flex'>
                  <ul className='flex'>
                      {
                          menu.map((x,i) => {
                              return <li key={i}><Link className='p-2 items-center justify-center flex' to={`/?category=${x.text}`}><span>{x.text}</span></Link></li>
                          })
                      }
                  </ul>
                  <button className='bg-gray-500 text-white px-2 py-1 rounded'>
                      <Link to='/create'>+ New Post</Link>
                  </button>
              </div>
          </div>
      </div>
      </div>
    )
}

export default Navbar;