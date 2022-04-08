import {React, useState} from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function Tools() {

	const [name,setName] = useState("")
	const [edit,setEdit] = useState(false)
	const [value,setValue] = useState("")

	const [openNode, setOpenNode] = useState(false)
	const [node,setNode] = useState({"type_vertex":"","value":[]})
	var deleteElems = []

	const [openEdge, setOpenEdge] = useState(false)
	const [source,setSource] = useState("")
	const [target,setTarget] = useState("")
	const [edge, setEdge] = useState({"source":"","target":""})

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
					<TextField
				    	defaultValue={node.id_vertex}
				        label="index of node"
				        type="text"
				        onChange={(e) => setValue(e.target.value)}
				        fullWidth
				    /> 	
				    <TextField
				    	defaultValue={name}
				        label="value like [1,2]"
				        type="text"
				        onChange={(e) => setName(e.target.value)}
				        fullWidth
				    /> 
				</DialogContent>

				<DialogActions>

					{edit && <Button onClick={() => (
						setOpenNode(false),
						setEdit(false)
						)} 
						color="primary">
						    Delete
					</Button>}

				    <Button onClick={() => (
				    	setOpenNode(false),
				    	setEdit(false)
				    	)} color="primary">
				        Cancel
				    </Button>
				    <Button onClick={() => (
				    	setEdit(false),
				    	setOpenNode(false)
				    	)}
				      	
				        color="primary">
				            Save
					</Button>
				</DialogActions>
				</Dialog>

				<div class="list-tools">
					
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
						setEdit(false)
						)} 
						color="primary">
						    Delete
					</Button>}
				    <Button onClick={() => (
				    	setOpenEdge(false),
				    	setEdit(false),
				    	setEdge("")
				    	)} color="primary">
				        Cancel
				    </Button>
				    <Button onClick={() => (
				    	setEdit(false),
				    	setOpenEdge(false),
				    	setEdge("")
				    	)}
				      	
				        color="primary">
				            Save
					</Button>
				</DialogActions>
				</Dialog>

				<div class="list-tools">
					

				</div>


			</div>
		</div>
	)
}


export default Tools;