import React, { Component } from "react";

import { Table, Icon, Pagination } from "semantic-ui-react";

import { getAll } from "../lib/expenseService";

class expense2 extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      articles: [],
      articleDatas: [],
      begin: 0,
      end: 9,
      activePage: 1,
      columnHeader: Array.from(Array(9).keys()),
    };

  }

  componentDidMount() {
    getAll("expense").then((rows) => {
      this.setState({
        articles: Array.from(Array(900).keys()),

        articleDatas: Array.from(Array(900).keys()).slice(
          this.state.begin,
          this.state.end
        ),
      });
    });
  }

  onChangePage = async (event: React.MouseEvent<HTMLAnchorElement>, data) => {
    await this.setState(
      {
        activePage: data.activePage,
        begin: data.activePage * 9 - 9,
        end: data.activePage * 9,
      }
    );

    this.setState({
      articleDatas: this.state.articles.slice(this.state.begin, this.state.end),
    });
  };

  handleClickEdit = itemId => {
    console.log("🚀 ~ file: expense2.js ~ line 49 ~ expense2 ~ itemId", itemId)
  };

  render() {
    return (
      <>
        <Table celled fixed selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Kwota</Table.HeaderCell>
              <Table.HeaderCell>Tytuł Przychodu</Table.HeaderCell>
              <Table.HeaderCell>Wpłacone na</Table.HeaderCell>
              <Table.HeaderCell>Kiedy</Table.HeaderCell>
              <Table.HeaderCell>Kto</Table.HeaderCell>
              <Table.HeaderCell>Komentarz</Table.HeaderCell>
              <Table.HeaderCell>Usuń</Table.HeaderCell>
              <Table.HeaderCell>Edytuj</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.columnHeader.map((item, i) => {
              return (
                <Table.Row key={`name_${i}`} onClick={()=>{this.handleClickEdit(item)}}>
                  {(this.state.articleDatas || []).map(function (
                    articleData,
                    i
                  ) {
                    return (
                      <Table.Cell key={`name_${i}`}>{articleData}</Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={9}>
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
                  nextItem={{
                    content: <Icon name="angle right" />,
                    icon: true,
                  }}
                  defaultActivePage={1}
                  totalPages={Math.ceil(this.state.articles.length / 9)}
                  onPageChange={this.onChangePage}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </>
    );
  }
}
export default expense2;
