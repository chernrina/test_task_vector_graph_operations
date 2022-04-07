import './App.css';
import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function PersonalPage() {

	const [newProject,setNewProject] = useState(false)
	const [projects,setProjects] = useState([])
	const [nameProject, setNameProject] = useState("")
	const [error,setError] = useState("")
	let  { username } = useParams()


	return (
		<div>
		<header class="navbar navbar-dark bg-info">
	        <div>
	        	<button class="btn btn-light btn-sm" onClick={() => window.location.reload()} > 
			        <Link to={{ pathname: `/logout/`, fromDashboard:false}} >
			        	Logout
				    </Link>	          
	            </button>
	        </div> 
	    </header> 

	    <div class="container">
	        <div class="body">
		      	<div class="body-side">
			    	<div class="user-name">
			      		{username}
			    	</div>
		    	</div>

		      	<div class="body-center">
		      		<div class="projects-area">
		      			{projects.map(p => (	
		      				<Link to={{ pathname: `/edit/${username}/${p.title}`, fromDashboard:false}}>     					      		
					      		<div class="project" key={p.id}>
					      			<div class="project-name">
					      				{p.title}
					      			</div>
					      		</div>
				      		</Link>
			      		))}	      	
		      		</div>
				</div>	      

		      	<div class="body-side">
		      		<div class="button">
			          	<button class="btn btn-info" href="" onClick={() => setNewProject(true)}> 
			          		Create project 
			          	</button>
			        </div>
		      	</div>

		      	<Dialog open={newProject} onClose={() => setNewProject(false)} aria-labelledby="form-dialog-title" fullWidth="true">
			          
			        <DialogContent>
			            <DialogTitle id="form-dialog-title">Project creation</DialogTitle>
				        <TextField
				            id="name-project"
				            label="Name project"
				            type="text"
				            onChange={(e) => {
				            	const newValue = e.target.value;
								  if (!newValue.match(/[\/:*?|%<>\$'"]/)) {
								    setError("")
								    setNameProject(newValue)
								  } else {
								    setError("Unforbidden character")
								  }
				            }}
				            error={error}
				            fullWidth="true"
				        />         
			        </DialogContent>

			        <DialogActions>
				        <Button onClick={() => setNewProject(false)} color="primary">
				            Cancel
				        </Button>
				        <Button onClick={() => setNewProject(false)} color="primary">
				            <Link to={{ pathname: `/edit/${username}/${nameProject}`, fromDashboard:false}}>
				      	        Create
				            </Link>
				        </Button>
			        </DialogActions>
			    </Dialog> 
			</div>
		</div>

	    <footer class="main-footer">
	    <hr/>
      	</footer>
	      
		</div>
	)

}



export default PersonalPage;