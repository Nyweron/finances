import React from "react";

import { Table, Icon, Label, Menu, Pagination } from "semantic-ui-react";

const expense2Add = () => {
  const arr = Array.from(Array(8).keys());
  const arr2 = Array.from(Array(80).keys());
  const columnHeader = Array.from(Array(9).keys());
  const columnHeaderLength = columnHeader.length;

  const onChangePage = () =>{}

  return (
    <>
      <br />
      <div>TEST</div>
      <br />
      <Table celled fixed>
        <Table.Header>
          <Table.Row>
            {columnHeader.map((item) => {
              return <Table.HeaderCell>Name {item}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {arr2.map((ite) => {
            return (
              <Table.Row>
                {arr.map((item) => {
                  return <Table.Cell>{item}</Table.Cell>;
                })}
                <Table.Cell
                  title={[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
                    "et dolore magna aliqua.",
                  ].join(" ")}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <br />

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={columnHeaderLength}>
              <Pagination
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true,
                }}
                firstItem={{
                  content: <Icon name="angle double left" />,
                  icon: true,
                }}
                lastItem={{
                  content: <Icon name="angle double right" />,
                  icon: true,
                }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={10}
                activePage={}
                onPageChange={onChangePage}

              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <br />
      <div>TEST2</div>
      <br />
    </>
  );
};

export default expense2Add;
