import React from 'react';

// Components
import Icon from 'components/ui/icon';

// Utils
import { logEvent } from 'utils/analytics';

// Modal
import Modal from 'components/modal/modal-component';
import ShareModal from 'components/modal/share-modal';

class ShareControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showShareModal: false
    };
  }

  handleToggleShareModal = (bool) => {
    this.setState({ showShareModal: bool });
  }

  // RENDER
  render() {
    const location = typeof window !== 'undefined' && window.location;

    return (
      <button type="button" className="share-button" onClick={() => this.handleToggleShareModal(true)}>
        <Icon name="icon-share" className="-small" />

        <Modal
          isOpen={this.state.showShareModal}
          className="-medium"
          onRequestClose={() => this.handleToggleShareModal(false)}
        >
          <ShareModal
            links={{
              link: location && location.href,
              embed: location && `${location.origin}/embed${location.pathname}${location.search}`
            }}
            analytics={{
              facebook: () => logEvent('Share', 'Share explore', 'Facebook'),
              twitter: () => logEvent('Share', 'Share explore', 'Twitter'),
              email: () => logEvent('Share', 'Share explore', 'Email'),
              copy: type => logEvent('Share', 'Share explore', `Copy ${type}`)
            }}
          />
        </Modal>
      </button>
    );
  }
}

export default ShareControl;
