import {React, useState} from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';


function Tools(props) {

	const [index,setIndex] = useState("")
	const [edit,setEdit] = useState(false)
	const [value,setValue] = useState("")
	const [type,setType] = useState("value")
	const [elem, setElem] = useState("")
	const types = {"value":1,"operation":2}

	const [openNode, setOpenNode] = useState(false)

	const [openEdge, setOpenEdge] = useState(false)
	const [source,setSource] = useState("")
	const [target,setTarget] = useState("")

	const addNode = function() {
		props.nodes.push({
					"local_id": index,
					"type_vertex": types[type],
        			"value": JSON.parse(value),
			        "graph_id": 1
				})
		console.log(types[type])
		clear()
	}

	const updateNode = function() {
		const ind = props.nodes.indexOf(elem)
		props.nodes[ind]["local_id"] = index
		props.nodes[ind]["type_vertex"] = types[type]
		props.nodes[ind]["value"] = JSON.parse(value)
		console.log(type)
		console.log(types[type])
		clear()

	}

	const deleteNode = function() {
		const ind = props.nodes.indexOf(elem)
		props.nodes.splice(ind,1)
		clear()
	}

	const clear = function() {
		setValue("")
		setIndex("")
		setElem("")
		setSource("")
		setTarget("")
	}

	const addEdge = function() {
		props.graph.push([
				source, target
			])
		clear()
	}

	const updateEdge = function() {
		const ind = props.graph.indexOf(elem)
		props.graph[ind][0] = source
		props.graph[ind][1] = target
		clear()
	}

	const deleteEdge = function() {
		const ind = props.graph.indexOf(elem)
		props.graph.splice(ind,1)
		clear()
	}

	return (
		<div>
			 <div class="state">
				<div class="module-name">
					<div class="module-title">
					Nodes
					</div> 
					<button class="add-item" onClick={() => (
						setOpenNode(true)
					)}>
						+
					</button>
					
				</div>

				<Dialog open={openNode} onClose={() => setOpenNode(false)} aria-labelledby="form-dialog-title" fullWidth="true">
				<DialogContent>
					<DialogTitle id="form-dialog-title">{edit && "Сhanging node"}
					{!edit && "Creating node"}</DialogTitle>	
					For operation use [1] for addition and [2] for multiplication
					<TextField
				    	defaultValue={index}
				        label="index of node"
				        type="text"
				        onChange={(e) => setIndex(e.target.value)}
				        fullWidth
				    /> 	
				    <FormControl >
						<InputLabel htmlFor="uncontrolled-native">Type</InputLabel>
							<NativeSelect
								defaultValue={type}
								onChange={(e) => {
								setType(e.target.value)
							}}>
								<option value="value">value</option>
								<option value="operation">operation</option>
							</NativeSelect>
					</FormControl>
				    <TextField
				    	defaultValue={"[" + value + "]"}
				        label="value like [1,2]"
				        type="text"
				        onChange={(e) => setValue(e.target.value)}
				        fullWidth
				    /> 
				</DialogContent>

				<DialogActions>

					{edit && <Button onClick={() => (
						deleteNode(),
						setOpenNode(false),
						setEdit(false)
						)} 
						color="primary">
						    Delete
					</Button>}

				    <Button onClick={() => (
				    	setOpenNode(false),
				    	setEdit(false),
				    	clear()
				    	)} color="primary">
				        Cancel
				    </Button>
				    <Button onClick={() => (
				    	!edit && addNode(),
				    	edit && updateNode(),
				    	setEdit(false),
				    	setOpenNode(false)
				    	)}				      	
				        color="primary">
				            Save
					</Button>
				</DialogActions>
				</Dialog>

				<div class="list-tools">
					{props.nodes.map(elem => (
					<div class="list-tool item node" onClick={() => (
						setValue(elem.value),
						setIndex(elem.local_id),
						setElem(elem),
						setOpenNode(true),
						setEdit(true)
						)}>
						{elem.local_id + ' : ' + "[" + elem.value + "]"} 	      						
					</div>
				))}
				</div>

			 </div>

			<div class="edges">
				<div class="module-name">
					<div class="module-title">
					Edges
					</div> 
					<button class="add-item" onClick={() => (
						setOpenEdge(true))}>
						+
					</button>
					
				</div> 

				<Dialog open={openEdge} onClose={() => setOpenEdge(false)} aria-labelledby="form-dialog-title" fullWidth="true">
				<DialogContent>
					<DialogTitle id="form-dialog-title">{edit && "Сhanging edge"}
					{!edit && "Creating edge"}</DialogTitle>	
					
				    <TextField
				        defaultValue={source}
				        label="id node from"
				        type="text"
				        onChange={(e) => setSource(e.target.value)}
				        fullWidth
				    /> 
				    
				    <TextField
				        defaultValue={target}
				        label="id node to"
				        type="text"
				        onChange={(e) => setTarget(e.target.value)}
				        fullWidth
				    /> 
				</DialogContent>

				<DialogActions>

					{edit && <Button onClick={() => (
						setOpenEdge(false),
						setEdit(false),
						deleteEdge()
						)} 
						color="primary">
						    Delete
					</Button>}
				    <Button onClick={() => (
				    	setOpenEdge(false),
				    	setEdit(false),
				    	clear()
				    	)} color="primary">
				        Cancel
				    </Button>
				    <Button onClick={() => (
				    	!edit && addEdge(),
				    	edit && updateEdge(),
				    	setEdit(false),
				    	setOpenEdge(false)
				    	)}
				      	
				        color="primary">
				            Save
					</Button>
				</DialogActions>
				</Dialog>

				<div class="list-tools">
					{props.graph.map(elem => (
					<div class="list-tool item node" onClick={() => (
						setOpenEdge(true),
						setSource(elem[0]),
						setTarget(elem[1]),
						setEdit(true),
						setElem(elem)
						)}>
						{elem[0] + "-" + elem[1]} 	      						
					</div>
					))}

				</div>


			</div>
		</div>
	)
}


export default Tools;