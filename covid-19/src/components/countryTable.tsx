import * as React from "react";

export interface ICountryTableProps {
  countries: { name: string; total: number; selected: boolean }[];
  handleClick: (e: React.SyntheticEvent) => void;
  handleSortByName: (e: React.SyntheticEvent) => void;
  OnSelectedRow: (c: string) => void;
}

class CountryTable extends React.Component<ICountryTableProps> {
  constructor(props: ICountryTableProps) {
    super(props);
  }
  render() {
    return (
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>
              {" "}
              <a href="/" onClick={(e) => this.props.handleSortByName(e)}>
                Country
              </a>
            </th>
            <th>
              {" "}
              <a href="/" onClick={(e) => this.props.handleClick(e)}>
                Total
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.countries.map((c) => {
            return (
              <tr
                key={c.name}
                style={
                  c.selected
                    ? { backgroundColor: "lightYellow" }
                    : { backgroundColor: "" }
                }
                onClick={() => this.props.OnSelectedRow(c.name)}
              >
                <td>{c.name}</td>
                <td>{c.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default CountryTable;
