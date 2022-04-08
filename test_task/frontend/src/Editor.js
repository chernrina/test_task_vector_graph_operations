import {React, useState,useEffect} from "react";
import Tools from './Tools.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function Editor() {

	let { username, projectname } = useParams()

	return (
		<div>
	    <header class="navbar navbar-dark bg-info">
	        <div>
	        	<button class="btn btn-light btn-sm"  > 
			        <Link to={{ pathname: `/lk/${username}`, fromDashboard:false}} >
			        	back
				    </Link>	          
	            </button>
	        </div> 
	    </header> 
	    <div class="body">
	      	<div class="body-side">

	      		<div class="project-title">
		      		Project: {projectname}
		      		<br/>
		      		<br/>
		      		<div class="button">
				        <button class="btn btn-info" href="" > 
				        	Save
				        </button>
				    </div>
				    <br/>
				    <div class="button">
				        <button class="btn btn-info" href="" > 
				        	Calculate
				        </button>
				    </div>
		      	</div>

	      	</div>



	      	<div class="body-center">
            	<div class="projects-area">
		      		 
		      	</div>

		    </div>



	      	<div class="body-side">
	      		<Tools />
		    </div>
		  
		</div>

		<footer class="main-footer">
        <hr/>
	    </footer>

		</div>
	);
}

export default Editor;
