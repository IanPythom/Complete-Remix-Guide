import { Link } from '@remix-run/react'

import HomeStyles from '~/styles/home.css'

export default function Index() {
  return (
    // <>
    //   <h1>This is the index Page</h1>
    //   <a href = "/demo">Go to demo by making a full request to a new page</a>
    //   <br></br>
    //   <Link to = "/demo">Go to demo only the content request</Link>
    // </>
    <main id="content">
      <h1>A better way of keepin track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to = "/notes">Try now</Link>
      </p>
    </main>
  );
}

export function links (){
  return [{rel: 'stylesheet', href: HomeStyles}]
}