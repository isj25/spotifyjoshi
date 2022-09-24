import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Block from "../components/Block";
const Artist = () => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem('token'))
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  let { name } = useParams();
  name = name.substring(1);

  const [albums, setAlbums] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  console.log(albums);

  async function fetchAlbums() {
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization : `Bearer ${token}`
      }
    }
    const data = await axios.get(`/artist:${name}`,config);

    setAlbums(data);
  }

  if (albums === "") {
    fetchAlbums();
  }

  useEffect(() => {
    if (dataFetched === false) {
      if (albums !== "") {
        setDataFetched(true);
      }
    }
  }, [dataFetched, albums]);

  return (
    <div className="types">
      <Button href="/" variant="warning">
        Go Back{" "}
      </Button>
      <Button href='/playlist' variant="warning" className="mx-3">Your Playlist</Button>
      <h2>Artists</h2>
      {dataFetched ? (
        <div>
          <Row>
            {albums.data.artists.items.map((item, index) => {
              if (item.images[0]) {
                return (
                  <Col className="col-md-3" key={index}>
                    <Block
                      name={item.name}
                      image={item.images[0].url}
                      description={item.type}
                      id={item.id}
                      type='artists'
                    ></Block>
                  </Col>
                );
              }else
              {
                return ''
              }
            })}
          </Row>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Artist;
