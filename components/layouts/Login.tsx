
import Login from '../Login';
  
const Home = () => {

    return (
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Perfil</h1>
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-1 lg:gap-8">

                  <div className="grid grid-cols-1 gap-4">
                    
                    <section aria-labelledby="announcements-title">
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <div className="p-6">
                          
                          <div className="flow-root mt-6">                            
                            
                            <Login />

                          </div>

                        </div>
                      </div>
                    </section>
    
                  </div>

          </div>
        </div>
      </main>
              
                
    )
}

export default Home