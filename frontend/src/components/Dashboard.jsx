import React, { Component, createRef } from 'react';
import { fetchNewsHeadlines, fetchNewsSources } from '../utils/newsApi';
import Options from './Options';
import Sources from './Sources';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      sources: [],
      next: false,
      options: {
        country: '',
        category: '',
        language: '',
      },
    };

    this.ref = createRef();
  }

  componentDidMount() {
    let localOptions = JSON.parse(localStorage.getItem('options'));

    console.log(localOptions);

    if (localOptions?.country) {
      fetchNewsHeadlines(localOptions).then((articles) =>
        this.setState({ articles }),
      );
    }
  }

  setCountry = (e) => {
    this.setState({
      options: {
        ...this.state.options,
        country: e.target.value,
      },
    });
  };
  setLanguage = (e) => {
    this.setState({
      options: {
        ...this.state.options,
        language: e.target.value,
      },
    });
  };
  setCategory = (e) => {
    this.setState({
      options: {
        ...this.state.options,
        category: e.target.value,
      },
    });
  };

  //will include later on
  // setSource = (e) => {
  //   this.setState({
  //     sources: Array.from(new Set(...this.state.sources, e.target.value)),
  //   });
  // };

  // handleNext = (e) => {
  //   e.preventDefault();
  //   fetchNewsSources(this.state.options).then((sources) =>
  //     this.setState({ sources, next: !this.state.next }),
  //   );
  // };

  handleNext = (e) => {
    e.preventDefault();
    if (
      this.state.options.country &&
      this.state.options.category &&
      this.state.options.language
    ) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
      fetchNewsHeadlines(this.state.options).then((articles) =>
        this.setState({ articles, next: !this.state.next }),
      );
    }
  };

  handleOptionRef() {
    console.log(this.ref);
    // this.optionRef.current.style = 'top :0';
  }

  render() {
    return (
      <div className="Dashboard">
        <Options
          ref={this.ref}
          setCountry={this.setCountry}
          setCategory={this.setCategory}
          setLanguage={this.setLanguage}
          handleNext={this.handleNext}
        />
        {/* include it later 
        <Sources
          sources={this.state.sources}
          handleSubmit={this.handleSubmit}
        /> 
        */}

        <div className="option-icon">
          <span onClick={this.handleOptionRef}> </span>
        </div>
        <div className="news_headlines">
          {this.state.articles.map((article) => (
            <div className="article">
              <div className="title">{article.title}</div>

              <div className="content">
                <p className="author">Author : {article.author}</p>
                <p className="publishedAt">
                  published at : {article.publishedAt}
                </p>
                <p className="desc">{article.description}</p>

                <p className="url">
                  <a href={`${article.url}`}>{article.source.name}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
