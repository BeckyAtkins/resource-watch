import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';

// actions
import * as actions from '../actions';

// selectors
import {
  getAvailableAreas,
  isAreaFound
} from '../selectors';
import { getSubscriptionsByArea } from './selectors';

// component
import AreaSubscriptionsModal from './component';

class AreaSubscriptionsModalContainer extends Component {
  static propTypes = {
    userSelection: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
    userAreas: PropTypes.array.isRequired,
    areaFound: PropTypes.bool.isRequired,
    activeArea: PropTypes.object.isRequired,
    subscriptionsByArea: PropTypes.array.isRequired,
    subscription: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setAreas: PropTypes.func.isRequired,
    getAreas: PropTypes.func.isRequired,
    getUserAreas: PropTypes.func.isRequired,
    getDatasets: PropTypes.func.isRequired,
    getUserSubscriptions: PropTypes.func.isRequired,
    setUserSelection: PropTypes.func.isRequired,
    clearUserSelection: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    resetModal: PropTypes.func.isRequired,
    createSubscriptionToArea: PropTypes.func.isRequired,
    createSubscriptionOnNewArea: PropTypes.func.isRequired,
    updateSubscription: PropTypes.func.isRequired,
    clearSubscriptions: PropTypes.func.isRequired,
    clearLocalSubscriptions: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {
      activeArea,
      setUserSelection,
      getAreas,
      getUserAreas,
      getDatasets,
      getUserSubscriptions
    } = this.props;

    // fetchs areas to populate areas selector
    getAreas();
    // fetchs user areas to populate areas selector
    getUserAreas();
    // fetchs suscribable datasets to populate datasets selector
    getDatasets();
    // fetchs user subscriptions
    getUserSubscriptions();

    setUserSelection({ area: activeArea });

    // if (Object.keys(activeDataset).length) {
    //   setUserSelection({
    //     datasets: [activeDataset].map(dataset => ({
    //       id: dataset.id,
    //       label: dataset.name,
    //       value: dataset.name,
    //       subscriptions: sortBy(Object.keys(dataset.subscribable || dataset.attributes.subscribable)
    //         .map((val, index) => ({
    //           label: val,
    //           value: val,
    //           ...(dataset.subscribable || dataset.attributes.subscribable)[val] &&
    //             { query: ((dataset.subscribable || dataset.attributes.subscribable)[val] || {}).dataQuery },
    //           ...index === 0 && { selected: true }
    //         })), 'label'),
    //       threshold: 1
    //     }))
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { subscriptionsByArea, setUserSelection, activeArea } = this.props;
    const { subscriptionsByArea: nextSubscriptions, activeArea: nextActiveArea } = nextProps;
    const subscriptionsChanged = !isEqual(subscriptionsByArea, nextSubscriptions);

    if (nextSubscriptions.length && subscriptionsChanged) {
      if (nextActiveArea && nextActiveArea.subscription) {
        const currentSubscription = nextSubscriptions.find(_subscription =>
          _subscription.id === activeArea.subscription.id);
        const subscriptionTypes = currentSubscription.datasetsQuery
          .filter(_datasetQuery => _datasetQuery.type)
          .map(_datasetQuery => _datasetQuery.type);

        setUserSelection({
          datasets: activeArea.subscription.datasets.map((dataset, index) => ({
            id: dataset.id,
            label: dataset.name,
            value: dataset.name,
            subscriptions: sortBy(Object.keys(dataset.subscribable ||
              dataset.subscribable)
              .map(val => ({
                label: val,
                value: val,
                ...subscriptionTypes.includes(val) && { selected: true }
              })), 'label'),
            threshold: activeArea.subscription.datasetsQuery[index].threshold
          }))
        });
      }
    }
  }

  componentWillUnmount() {
    const {
      clearSubscriptions,
      clearUserSelection,
      clearLocalSubscriptions,
      // activeDataset,
      setUserSelection
    } = this.props;

    clearLocalSubscriptions();
    clearSubscriptions();
    clearUserSelection();

    // if (Object.keys(activeDataset).length) {
    //   setUserSelection({
    //     datasets: [activeDataset].map(dataset => ({
    //       id: dataset.id,
    //       label: dataset.name,
    //       value: dataset.name,
    //       subscriptions: sortBy(Object.keys(dataset.subscribable || dataset.attributes.subscribable)
    //         .map((val, index) => ({
    //           label: val,
    //           value: val,
    //           ...(dataset.subscribable || dataset.attributes.subscribable)[val] &&
    //             { query: ((dataset.subscribable || dataset.attributes.subscribable)[val] || {}).dataQuery },
    //           ...index === 0 && { selected: true }
    //         })), 'label'),
    //       threshold: 1
    //     }))
    //   });
    // }
  }

  render() {
    return (<AreaSubscriptionsModal {...this.props} />);
  }
}

export default connect(
  state => ({
    userSelection: state.subscriptions.userSelection,
    areas: getAvailableAreas(state),
    areaFound: isAreaFound(state),
    userAreas: state.subscriptions.userAreas.list,
    subscriptionsByArea: getSubscriptionsByArea(state),
    subscription: state.subscriptions.subscriptionCreation,
    preview: state.subscriptions.list.preview,
    loading: state.subscriptions.areas.loading ||
      state.subscriptions.userAreas.loading || state.subscriptions.datasets.loading
    // loading: state.subscriptions.loading || state.subscriptions.areas.loading ||
    //   state.subscriptions.userAreas.loading || state.subscriptions.datasets.loading
  }),
  actions
)(AreaSubscriptionsModalContainer);
