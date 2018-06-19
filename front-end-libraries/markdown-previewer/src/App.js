import React, { Component } from "react";
import marked from "marked";
import "bulma/css/bulma.css";
import "./App.css";
import { preloadedTextarea } from "./constants";

export default class App extends Component {
  state = {
    textarea: preloadedTextarea
  };

  getMarkdownText = () => {
    const rawMarkup = marked(this.state.textarea, { breaks: true });
    return { __html: rawMarkup };
  };

  render() {
    return (
      <main className="main">
        <section className="textarea-wrapper">
          <form>
            <textarea
              id="editor"
              rows="15"
              className="textarea"
              placeholder="e.g. Hello world"
              value={this.state.textarea}
              onChange={e => this.setState({ textarea: e.target.value })}
            />
          </form>
        </section>
        <section className="content-wrapper">
          <div className="content">
            <div
              id="preview"
              dangerouslySetInnerHTML={this.getMarkdownText()}
            />
          </div>
        </section>
      </main>
    );
  }
}
