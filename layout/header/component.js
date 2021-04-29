import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import MediaQuery from 'react-responsive';

// components
import HeaderMenu from 'layout/header/header-menu';
import HeaderMenuMobile from 'layout/header/header-menu-mobile';
import Icon from 'components/ui/icon';

// utils
import { breakpoints } from 'utils/responsive';

// styles
import './styles.scss';

class Header extends PureComponent {
  static propTypes = {
    header: PropTypes.object.isRequired,
    responsive: PropTypes.object.isRequired,
    pageHeader: PropTypes.bool,
  };

  static defaultProps = { pageHeader: false };

  render() {
    const {
      header: { admin },
      pageHeader,
      responsive: { fakeWidth },
    } = this.props;
    const { medium } = breakpoints;
    const headerClass = classnames(
      'l-header',
      { '-transparent': pageHeader },
    );
    const containerClass = classnames(
      'l-container',
      { '-admin': admin },
    );

    return (
      <header className={headerClass}>
        <div className={containerClass}>
          <div className="row">
            <div className="column">
              <div className="header-main">
                <div className="header-logo">
                  <Link href="/">
                    <a>
                      <Icon name="icon-rw-logo" className="brand-logo" />
                      <h1 className="brand-title">Resource Watch</h1>
                    </a>
                  </Link>
                </div>

                {/* Mobile header */}
                <MediaQuery
                  maxDeviceWidth={medium - 1}
                  values={{ deviceWidth: fakeWidth }}
                >
                  <HeaderMenuMobile />
                </MediaQuery>

                {/* Desktop header */}
                <MediaQuery
                  minDeviceWidth={medium}
                  values={{ deviceWidth: fakeWidth }}
                >
                  <HeaderMenu />
                </MediaQuery>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
