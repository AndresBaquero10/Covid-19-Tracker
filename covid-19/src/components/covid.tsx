import * as React from "react";
import Loading from "./loading";
import CountryTable from "./countryTable";
import axios from "axios";
import Chart from "./dash";
import "../Style.css";

export interface ICovidProps {}

export interface ICovidState {
  countries: { name: string; total: number; selected: boolean }[];
  totalInfected: number;
  greaterSort: boolean;
  selectedCountries: { name: string; total: number; selected: boolean }[];
}

class Covid extends React.Component<ICovidProps, ICovidState> {
  constructor(props: ICovidProps) {
    super(props);
    this.state = {
      countries: [{ name: "", total: 0, selected: false }],
      totalInfected: 0,
      greaterSort: false,
      selectedCountries: [],
    };
  }

  url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

  async componentDidMount() {
    const response = await axios.get(this.url);
    const rows = response.data.split("\n");
    let allCountryTotal = 0;
    const countries = [];
    let countryName = "";
    let total = 0;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      countryName = row[0].replace(/"/g, "");
      total = parseInt(row[4]);
      if (countryName !== "") {
        countries.push({
          name: countryName,
          total: total,
          selected: false,
        });
        allCountryTotal += total;
      }
    }
    this.setState({ countries: countries, totalInfected: allCountryTotal });
  }
  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handleClick = (e: React.SyntheticEvent) => {
    this.setState({ greaterSort: !this.state.greaterSort });

    if (this.state.greaterSort) return this.handleOnSortByTotalGreater(e);
    else if (!this.state.greaterSort) return this.handleOnSortByTotalShorter(e);
  };
  handleOnSortByTotalGreater = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let newCountries = [...this.state.countries];
    newCountries = newCountries.sort((a, b) =>
      a.total > b.total ? -1 : a.total < b.total ? 1 : 0
    );

    this.setState({
      countries: newCountries,
    });
  };
  handleOnSortByTotalShorter = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let newCountries = [...this.state.countries];
    newCountries = newCountries.sort((a, b) =>
      a.total > b.total ? 1 : a.total < b.total ? -1 : 0
    );

    this.setState({
      countries: newCountries,
    });
  };

  handleSortByName = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newCountries = [...this.state.countries];
    newCountries = newCountries.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    this.setState({
      countries: newCountries,
    });
  };

  handleSelectedRow = (c: string) => {
    let Countries = [...this.state.countries];
    const index = Countries.findIndex((country) => country.name === c);
    const selected = Countries[index];
    selected.selected = !selected.selected;
    Countries[index] = selected;
    this.setState({
      countries: Countries,
      selectedCountries: Countries.filter((c) => c.selected),
    });
  };
  render() {
    return (
      <div className="container-box">
        <main role="main">
          <h1 style={{ textAlign: "center" }}>
            Total number of people infected with COVID-19:{" "}
            {this.numberWithCommas(this.state.totalInfected)}
          </h1>
          {this.state.totalInfected === 0 ? (
            <Loading></Loading>
          ) : (
            <div>
              <Chart countries={this.state.selectedCountries} />
              <CountryTable
                countries={this.state.countries}
                handleClick={this.handleClick}
                handleSortByName={this.handleSortByName}
                OnSelectedRow={this.handleSelectedRow}
              ></CountryTable>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Covid;
