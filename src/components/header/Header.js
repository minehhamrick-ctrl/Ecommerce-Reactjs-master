import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import styles from './stylesheets/header.module.sass';

import UserHeader from './components/UserHeader';
import Menu from './components/Menu';
import Search from './components/Search';

import jumpTo, { go } from '../../modules/Navigation';
import Auth from '../../modules/Auth';
import device from '../../modules/mediaQuery';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      isToggle: false
    };
  }

  handleChange = (v) => {
    this.setState({
      input: v
    });
  };

  handleSuggest = (v) => {
    this.setState({
      input: v
    });
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      isToggle: !prevState.isToggle
    }));
  };

  closeToggle = () => {
    this.setState({
      isToggle: false
    });
  };

  handleLogoClick = () => {
    const { getAllProducts } = this.props;

    getAllProducts();
    jumpTo('/dashboard');
  };

  handleLogout = () => {
    Auth.logout();
    go('/dashboard');
  };

  render() {
    const {
      user_token,
      departments,
      search,
      getProductsByCategory,
      getAllProducts
    } = this.props;

    const {
      input,
      isToggle
    } = this.state;

    const visibility = isToggle ? 'show' : 'hide';

    return (
      <div className={styles.outbox}>
        {/* Desktop / tablet view */}
        <MediaQuery query={device.min.tablet}>
          {/* User header */}
          <div className={styles.user_header}>
            <UserHeader user_token={user_token} />
          </div>

          {/* Main header */}
          <div className={styles.content}>
            {/* Logo */}
            <div className={styles.left}>
              <div
                className={styles.logo}
                onClick={this.handleLogoClick}
              >
                Zack Market
              </div>
            </div>

            {/* Navigation menu */}
            <div className={styles.mid}>
              <Menu
                departments={departments}
                getProductsByCategory={getProductsByCategory}
                getAllProducts={getAllProducts}
              />
            </div>

            {/* Search */}
            <div className={styles.right}>
              <Search
                search={search}
                onChange={this.handleChange}
                input_value={input}
                handleSuggest={this.handleSuggest}
              />
            </div>
          </div>
        </MediaQuery>

        {/* Mobile view */}
        <MediaQuery query={device.max.tablet}>
          <div className={styles.content}>
            <div className={styles.toggle_outbox}>
              {/* Side menu */}
              <div
                id="toggle"
                className={styles[visibility]}
              >
                <div className={styles.toggle_content}>
                  {/* Menu heading */}
                  <div className={styles.side_title}>
                    MENU

                    <div
                      className={styles.side_title_close}
                      onClick={this.closeToggle}
                    >
                      x
                    </div>
                  </div>

                  {/* Search */}
                  <Search
                    search={search}
                    onChange={this.handleChange}
                    input_value={input}
                    handleSuggest={this.handleSuggest}
                  />

                  {/* Categories */}
                  <div className={styles.side_title}>
                    CATEGORY
                  </div>

                  <Menu
                    departments={departments}
                    getProductsByCategory={getProductsByCategory}
                    getAllProducts={getAllProducts}
                  />

                  {/* Cart */}
                  <div className={styles.side_title}>
                    CART
                  </div>

                  <div
                    className={styles.side_content}
                    onClick={() => jumpTo('/bag')}
                  >
                    Shopping Bag
                  </div>

                  {/* User */}
                  <div className={styles.side_title}>
                    USER
                  </div>

                  <div
                    className={styles.side_content}
                    onClick={() => jumpTo('/login')}
                  >
                    Login
                  </div>

                  <div
                    className={styles.side_content}
                    onClick={this.handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>

              {/* Mobile toggle icon */}
              <div
                className={`${styles.toggle_icon} ${styles[visibility]}`}
                onClick={this.handleToggle}
              >
                <div className={styles.bar1} />
                <div className={styles.bar2} />
                <div className={styles.bar3} />
              </div>
            </div>

            {/* Mobile logo */}
            <div
              className={styles.logo}
              onClick={this.handleLogoClick}
            >
              Zack Market
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}