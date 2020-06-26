import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Card, Input, Empty } from "antd";
const { Meta } = Card;
const { Search } = Input;
export default function ItuneList() {
  const [tunes, setTunes] = useState([]);
  const [total, setTotal] = useState(0);

  const onSearch = (value) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${value}`
      )
      .then((res) => {
        setTotal(res.data.resultCount);
        setTunes(res.data.results);
        console.table(tunes);
      });
  };

  return (
    <div className="container">
      <Search
        placeholder="Search iTune by Artist"
        onSearch={onSearch}
        enterButton
        className="search-input"
      />
      {tunes.length !== 0 ? (
        <>
          <Row gutter={{ xs: 32, sm: 16, md: 24, lg: 32 }} type="flex">
            {tunes.map((tune, index) => {
              return (
                <Col className="gutter-row" span={6} key={index}>
                  <Card
                    hoverable
                    className="ant-card-image-display"
                    //style={{ width: 240 }}
                    cover={<img alt="example" src={tune.artworkUrl100} />}
                  >
                    <Meta
                      title={tune.trackCensoredName.split("(")[0]}
                      description={tune.artistName}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
}
