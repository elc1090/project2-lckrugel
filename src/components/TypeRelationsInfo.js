import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import typeDisplay from "../utils/typeDisplay"
import './TypeRelationsInfo.css';

export default function TypeRelationsInfo(props) {
	
	return (
		<Container id="TypesInfo">
			{ props.typeRelations &&
				<>
					<Row className="mb-2" id="attacking">
						<h2>Attacking</h2>
						<h4 className="str">More damage against</h4>
						<ul>
							{props.typeRelations.attacking.strenghts.map((attStr) => 
								typeDisplay(attStr, props.typeRelations.attacking.strenghts.indexOf(attStr))
							)}
						</ul>
						<h4 className="wek">Less damage against</h4>
						<ul>
							{props.typeRelations.attacking.weaknesses.map((attWek) => 
								typeDisplay(attWek, props.typeRelations.attacking.weaknesses.indexOf(attWek))
							)}
						</ul>
						<h4 className="imu">No damage against</h4>
						<ul>
							{props.typeRelations.attacking.imunities.map((attImu) => 
								typeDisplay(attImu, props.typeRelations.attacking.imunities.indexOf(attImu))
							)}
						</ul>
					</Row>

					<Row className="mt-2" id="defending">
						<h2>Defending</h2>
						<h4 className="str">Less damage from</h4>
						<ul>
							{props.typeRelations.defending.strenghts.map((defStr) => 
								typeDisplay(defStr, props.typeRelations.defending.strenghts.indexOf(defStr))
							)}
						</ul>
						<h4 className="wek">More damage from</h4>
						<ul>
							{props.typeRelations.defending.weaknesses.map((defWek) => 
								typeDisplay(defWek, props.typeRelations.defending.weaknesses.indexOf(defWek))
							)}
						</ul>
						<h4 className="imu">No damage from</h4>
						<ul>
							{props.typeRelations.defending.imunities.map((defImu) => 
								typeDisplay(defImu, props.typeRelations.defending.imunities.indexOf(defImu))
							)}
						</ul>
					</Row>
				</>
			}			
		</Container>
	)
}