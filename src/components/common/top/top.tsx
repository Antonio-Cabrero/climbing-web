import React, { useState, useEffect } from 'react';
import { Loading } from '../widgets/widgets';
import { Table, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getTop } from '../../../api';

const Top = ({idArea, idSector}) => {
  const [top, setTop] = useState([]);

  useEffect(() => {
    getTop(idArea, idSector).then((res) => {
      setTop(res);
    });
  }, [idArea, idSector]);

  if (!top) {
    return <Loading />;
  }
  const rows = top.map((t, i) =>
    <Table.Row key={i}>
      <Table.Cell>#{t.rank}</Table.Cell>
      <Table.Cell>
        <Header as='h4' image>
          <Image src={t.picture} circular size='tiny' />
          <Header.Content as={Link} to={`/user/${t.userId}`}>{t.name}</Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{t.percentage}%</Table.Cell>
    </Table.Row>
  );
  return (
    <Table basic='very' size="small" celled collapsing unstackable compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Rank</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Completed</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  )
}

export default Top;