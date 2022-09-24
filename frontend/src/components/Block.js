import React from "react";
import { Card } from "react-bootstrap";

const Block = (props) => {
  //console.log(props.name)

  let URL = `/tracks:${props.id}/type:${props.type}`;
  //console.log(props.id)
  if (props.type === "artists" || props.type==='artist') {
    URL = `/tracks:${props.id}/artists`;
  }
  //console.log(URL)
  return (
    <div>
      <Card style={{ width: "18rem" }} className="my-3">
        {props.image ? (
          <a href={URL}>
            <Card.Img variant="top" src={props.image} />
          </a>
        ) : (
          ""
        )}

        <Card.Body>
          <a href={URL}>
          <Card.Title>{props.name}</Card.Title>
          </a>
          
          <Card.Text>Type : {props.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Block;
