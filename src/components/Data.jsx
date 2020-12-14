'use strict';

export default class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rows: []
    };
  }

  render() {
    const { loading, rows } = this.state;

    if (loading) {
      return <div id="loading"></div>;
    }

    if (!rows.length) {
      return null;
    }

    const headers = Object.keys(rows[0]);

    return (
      <table>
        <tr>
          {headers.map((h, i) => {
            return <td key={i}>{h}</td>;
          })}
        </tr>
        {rows.map((row) => {
          const values = Object.values(row);
          return (
            <tr>
              {values.map((value, i) => {
                return <td key={i}>{value}</td>
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}