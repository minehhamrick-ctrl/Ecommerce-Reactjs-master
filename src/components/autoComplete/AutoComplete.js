import React, { Component } from 'react';
import styles from './auto.module.sass';

export default class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      val: ''
    };
  }

  handleChange = (e) => {
    const input = e.target.value;
    const { filter, onChange } = this.props;

    // Update the filtered suggestions
    filter(input);

    // Notify parent component when an onChange callback is provided
    if (onChange) {
      onChange(input);
    }

    this.setState({
      val: input
    });
  };

  handleFocus = () => {
    this.setState({
      isFocus: true
    });
  };

  handleBlur = () => {
    let blurTimer = null;

    blurTimer = setTimeout(() => {
      this.setState(
        {
          isFocus: false
        },
        () => {
          clearTimeout(blurTimer);
        }
      );
    }, 100);
  };

  handleClick = (v) => {
    const { suggest_value } = this.props;

    if (suggest_value) {
      suggest_value(v);
    }

    this.setState({
      val: v
    });
  };

  render() {
    const {
      filter_result,
      style,
      error,
      loading
    } = this.props;

    const { isFocus, val } = this.state;

    const results = filter_result || {};
    const categories = Object.keys(results);

    return (
      <div
        className={styles.outbox}
        style={style}
      >
        <input
          type="text"
          value={val}
          placeholder="Search"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

        <div className={styles.sugges_outbox}>
          {isFocus &&
            !error &&
            !loading &&
            categories.map((category) => (
              <div
                key={category}
                className={styles.sugges_box}
              >
                <div className={styles.sugges_category}>
                  {category}
                </div>

                <div className={styles.sugges_arr}>
                  {results[category].map((suggestion) => (
                    <div
                      key={suggestion}
                      className={styles.sugges_value}
                      onClick={() => this.handleClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}