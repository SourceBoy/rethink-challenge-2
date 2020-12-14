'use strict';

import Data from './Data';

const { Component, Fragment } = React;
const search_client = algoliasearch('RG7EF7O4HB', 'e7fb0319c1640be0f894d48f12c899c7');
const search_index = search_client.initIndex('nyc-311');

class App extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.Data = React.createRef();
    this.search = this.search.bind(this);
  }

  search(e) {
    const { value } = e.target;
    if (!value) {
      return;
    }
    search_index.search(value, {
      hitsPerPage: 100
    }).then((result) => {
      result.hits.forEach((row) => {
        delete row._highlightResult;
        delete row.objectID;
      });

      this.Data.current.setState({
        rows: result.hits
      });
    });
  }

  render() {
    return (
      <Fragment>
        <section id="input">
          <input
            ref={this.input}
            onChange={this.search}
            type="text"
            autoComplete="off"
            autoFocus
          />
        </section>
        <section id="data">
          <Data ref={this.Data} />
        </section>
      </Fragment>
    );
  }
}