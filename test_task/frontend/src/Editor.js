import {React, useState,useEffect} from "react";
import Tools from './Tools.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";
import GraphVis from './GraphVis.js';

function Editor() {
	axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
	axios.defaults.xsrfCookieName = "csrftoken";
	let { username, projectname } = useParams()
	const [load,setLoad] = useState(false)
	const [saving,setSaving] = useState(false)
	const [graph, setGraph] = useState([])
	const [vertex, setVertex] = useState([])

	const [graphVis,setGraphVis] = useState({
	    	nodes: [],
	    	edges: []
	  	})

  	const createGraphVis = function() {
  		console.log("create")
  		console.log(vertex)
  		var res = {
	    	nodes: [],
	    	edges: []
	  	}
		for (var i = 0; i < graph.length; i++) {
			res.edges.push({ 
				from: graph[i][0], to: graph[i][1] 
			})				
		}
		for (var i = 0; i < vertex.length; i++) {
			if (vertex[i]["type_vertex"] == 2)
				if (vertex[i]["value"][0] == 1)
					res.nodes.push({ 
						id: vertex[i]["local_id"], 
						label: "add"
					})
				else
					res.nodes.push({ 
						id: vertex[i]["local_id"], 
						label: "mul"
					})
			else
				res.nodes.push({ 
					id: vertex[i]["local_id"], 
					label: "[" + vertex[i]["value"].join(',') + "]"
				})				
		}
		setGraphVis(res)
		timeFunction()		
	}

	function timeFunction() {
        setTimeout(function(){ setLoad(true); }, 100);
    }

    function save() {
        axios({
			method: "POST",
			url: "http://127.0.0.1:8000/api/graph/" + username + "/" + projectname,
			data: {
				"name": projectname,
				"user_id": null,
				"value": graph
			}
			}).then(response => {				  		
		})
		axios({
			method: "POST",
			url: "http://127.0.0.1:8000/api/vertex/" + username + "/" + projectname,
			data: vertex
			}).then(response => {
				setSaving(true)
		})
		setTimeout(function(){ setSaving(false); }, 2000)
    }


	useEffect(() => {
		axios({
  		method: "GET",
  		url: "http://127.0.0.1:8000/api/graph/" + username + "/" + projectname
  		}).then(response => {
  			setGraph(response.data[0]["value"])
  		})
	}, [])

	useEffect(() => {
		axios({
  		method: "GET",
  		url: "http://127.0.0.1:8000/api/vertex/" + username + "/" + projectname
  		}).then(response => {
  			setVertex(response.data)
  		})
	}, [])

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
				        <button class="btn btn-info" href="" onClick={() => (
				        	setLoad(false),
				        	setGraphVis({
						    	nodes: [],
						    	edges: []
						  	}),
				        	createGraphVis()
				        	)} > 
				        	Show graph
				        </button>
				    </div>
				    <br/>
		      		<div class="button">
				        <button class="btn btn-info" href="" onClick={() => (
				        	save()
				        	)} > 
				        	Save
				        </button>
				    </div>
				    <br/>
				    <div class="button">
				        <button class="btn btn-info" href="" onClick={() => (
				        	save(),
				        	axios({
						  		method: "GET",
						  		url: "http://127.0.0.1:8000/api/calculate/" + 1 + "/" + username + "/" + projectname
						  	}).then(response => {
						  		setGraph(response.data["graph"])
						  		setVertex(response.data["vertex"])
						  	})		
				        	)} > 
				        	Calculate
				        </button>
				    </div>
				    <br/>
				    <div class="button">
				        <button class="btn btn-info" href="" onClick={() => (
				        	save(),
				        	axios({
						  		method: "GET",
						  		url: "http://127.0.0.1:8000/api/calculate/" + 2 + "/" + username + "/" + projectname
						  	}).then(response => {
						  		setGraph(response.data["graph"])
						  		setVertex(response.data["vertex"])
						  	})	
				        	)} > 
				        	Recalculate graph
				        </button>
				    </div>
		      	</div>

	      	</div>



	      	<div class="body-center">
		      	{load && <GraphVis graph={graphVis} />}
		    </div>

	      	<div class="body-side">
	      		<Tools graph={graph} nodes={vertex} />
		    </div>
		  
		</div>

		<footer class="main-footer">
        <hr/>
        {saving && <div> Save </div>}
	    </footer>

		</div>
	);
}

export default Editor;
