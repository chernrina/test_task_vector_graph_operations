import './App.css';

function HomePage() {

    return (
        <div>
        	<header class="navbar navbar-dark bg-info">     
			</header> 
	  
	   		<section class="main-info">
			    <div class="container">
				    <div class="main-body">
				        <div >
					        <h3> Веб-приложение для произведений работы над векторами. </h3>
				        </div>

				        <br/>

				        <a class="btn btn-info" href="http://127.0.0.1:8000/registration/"> Get started </a> 
						
						<br/>
						<br/>
						
						<a class="btn btn-info" href="http://127.0.0.1:8000/login/"> Login </a>
					</div>
				</div>
			</section>  

		    <footer>
		    <hr/>
		    </footer>

        </div>
    );
  
}



export default HomePage;