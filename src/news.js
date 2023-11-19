import React from "react";
import spinner from "./spinner.gif";
import { Link } from "react-router-dom";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      searchTerm: "",
      sortField: "publishedAt",
      sortOrder: "desc",
    };
  }

  async fetchData() {
    this.setState({ loading: true });

    try {
      let url;

      if (this.state.searchTerm) {
        url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=dca1f06731124a10960e18e5c27512f4 `;
      } else {
        url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=dca1f06731124a10960e18e5c27512f4 `;
      }

      let res = await fetch(url);
      let data = await res.json();
      let articles = data.articles;

      articles.sort((a, b) => {
        const aValue = a[this.state.sortField];
        const bValue = b[this.state.sortField];

        if (this.state.sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      articles = articles.map((article) => (
        <div className="p-8" key={article.title}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src={article.urlToImage}
              alt={article.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{article.title}</div>
              <p className="text-gray-700 text-base">{article.description}</p>
              <button className="font-bold text-xl mb-2">
                <a href={article.url}>Read more</a>
              </button>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{article.author}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{article.source.name}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{article.publishedAt}
              </span>
            </div>
          </div>
        </div>
      ));

      this.setState({ articles, loading: false });
    } catch (error) {
      console.error("Error fetching data: ", error);
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchTerm !== prevState.searchTerm ||
      this.props.newsName !== prevProps.newsName
    ) {
      this.fetchData();
    }
  }

  getFieldValue = (obj, field) => {
    // ... existing getFieldValue logic
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };

  handleSortChange = (event) => {
    const { value } = event.target;
    this.setState({ sortField: value }, () => {
      this.fetchData();
    });
  };

  handleOrderChange = (event) => {
    const { value } = event.target;
    this.setState({ sortOrder: value }, () => {
      this.fetchData();
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="mx-4 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1">
        <form onSubmit={this.handleSearchSubmit} className="flex mb-4">
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            placeholder="Search for news..."
            className="text-base h-10"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 ml-2 rounded h-10"
          >
            Search
          </button>
        </form>

        <div className="mb-4">
          <label htmlFor="sortField" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortField"
            value={this.state.sortField}
            onChange={this.handleSortChange}
            className="text-base h-10"
          >
            <option value="publishedAt">Published Date</option>
            <option value="author">Author</option>
          </select>
          <select
            id="sortOrder"
            value={this.state.sortOrder}
            onChange={this.handleOrderChange}
            className="text-base h-10 ml-2"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {this.state.loading ? (
          <img
            src={spinner}
            alt="Loading"
            style={{ width: "300px", margin: "auto" }}
          />
        ) : (
          this.state.articles
        )}

        <Link to="/reload" className="font-bold text-xl mb-2">
          <i className="fas fa-sync"></i> <h1>Fetching DATA</h1>
        </Link>
      </div>
    );
  }
}

export default News;