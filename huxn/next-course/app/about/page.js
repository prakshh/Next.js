import React from 'react'

const About = () => {
  return (
    <div>About</div>
  )
}

export default About




/*

🚀 Next.js App Router Insights!

Routing is like giving directions to a website. When you type a web address (URL) into your browser, routing tells the website which page or thing to show you. It's like a map that guides the website to the right place when you click a link or enter a web address. So, routing helps the website know what to display based on what you're looking for.

💡 Observation 1:

    URL routing is folder-driven under the app directory.

    For example: 
    app/about/page.js → http://localhost:3000/about

    Renaming about to portfolio changes the route to:
    http://localhost:3000/portfolio

💡 Observation 2:

    The component name in the file (e.g., About) has no effect on routing.
    
    For example:
      app/about/page.js

      const About = () => {return (<div>About</div>)}
      export default About

      const Hello = () => {return (<div>Hello</div>)}
      export default Hello

      This still maps to /about.

💡 Observation 3:
    
    The file name inside route folders must always be page.js.
    
    For example:
      app/about/page.js ✅  
      app/about/about.js ❌  
    📌 Stick to the structure and let Next.js handle the rest! #NextJS #WebDev

*/