import React from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import WRISerializer from 'wri-json-api-serializer';

import isEmpty from 'lodash/isEmpty';

// Redux
import { connect } from 'react-redux';

import { getUserAreas } from 'redactions/user';

// Selectors
import areaAlerts from 'selectors/user/areaAlerts';

// Services
import DatasetService from 'services/DatasetService';
import {
  createSubscriptionToArea,
  updateSubscriptionToArea,
  deleteSubscription
} from 'services/subscriptions';

// Components
import Spinner from 'components/ui/Spinner';
import SubscriptionSelector from 'components/subscriptions/SubscriptionSelector';

// Utils
import { getLabel } from 'utils/datasets/dataset-helpers';
import { logEvent } from 'utils/analytics';

class AreaSubscriptionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingDatasets: true,
      loading: false,
      datasets: [],
      alerts: props.area.id in props.alerts ? props.alerts[props.area.id] : [],
      sortedDatasets: []
    };

    // Services
    this.datasetService = new DatasetService(null, {
      apiURL: process.env.WRI_API_URL,
      language: props.locale
    });

    // ------------------- Bindings -----------------------
    this.handleSubmit = this.handleSubmit.bind(this);
    // ----------------------------------------------------
  }

  componentDidMount() {
    this.loadDatasets();
  }

  onChangeSubscription(value, type, key) {
    let modified = false;
    const { alerts, datasets } = this.state;
    alerts.map((a, k) => {
      if (k === key) {
        if (type === 'dataset') {
          const dataset = datasets.find(d => d.id === value);
          modified = dataset.id !== a.dataset;
          const label = getLabel(dataset);
          dataset.label = label;
          a.dataset = dataset;
        } else {
          modified = a[type] !== value;
          a[type] = value;
        }
      }
      return a;
    });

    if (modified) {
      this.setState({ alerts });
    }
  }

  onRemoveDataset(key) {
    let { alerts } = this.state;
    alerts = alerts.filter((a, k) => k !== key);
    this.setState({ alerts });
  }

  onAddAlert() {
    const { alerts } = this.state;
    const newAlert = {
      dataset: { subscribable: {} },
      id: null,
      lastSeenDate: null,
      threshold: 1,
      type: null
    };
    alerts.push(newAlert);
    this.setState({ alerts });
  }

  loadDatasets() {
    this.datasetService.getSubscribableDatasets('metadata').then((response) => {
      const datasets = WRISerializer({ data: response }).filter(a => !isEmpty(a.subscribable));
      this.setState({
        loadingDatasets: false,
        datasets,
        sortedDatasets: datasets.map((d) => {
          const label = getLabel(d);
          return { value: d.id, label };
        })
      });
    }).catch(err => toastr.error('Error', err)); // TODO: update the UI
  }

  handleSubmit() {
    const { area, user, locale, mode } = this.props;
    const { alerts } = this.state;

    let missingValues = false;

    const datasets = alerts.map(a => a.dataset.id);
    const datasetsQuery = alerts.map((a) => {
      missingValues = missingValues || (!a.dataset.id || !a.type || !a.threshold);
      return {
        id: a.dataset.id,
        type: a.type,
        threshold: parseFloat(a.threshold)
      };
    });

    if (missingValues) {
      toastr.error('Data missing', 'Please select a dataset, subscription type and threshold for all items');
      return;
    }

    logEvent('My RW', 'Edit subscription', area.name);

    if (mode === 'new') {
      if (!datasets.length) {
        toastr.error('Error', 'Please select at least one dataset');
        return;
      }

      createSubscriptionToArea({
        areaId: area.id,
        datasets,
        datasetsQuery,
        user,
        language: locale
      }).then(() => {
        toastr.success('Success!', 'Subscription created successfully');
        this.props.dispatch(getUserAreas());
        this.props.onRequestClose();
      }).catch(err => toastr.error('Error creating the subscription', err));
    } else {
      if (!datasets.length) {
        deleteSubscription(area.subscription.id, user.token)
          .then(() => {
            toastr.success('Success!', 'Subscription updated successfully');
            this.props.dispatch(getUserAreas());
            this.props.onRequestClose();
          }).catch(err => toastr.error('Error updating the subscription', err));
        return;
      }

      updateSubscriptionToArea(
        area.subscription.id,
        datasets,
        datasetsQuery,
        user,
        locale
      ).then(() => {
        toastr.success('Success!', 'Subscription updated successfully');
        this.props.dispatch(getUserAreas());
        this.props.onRequestClose();
      }).catch(err => toastr.error('Error updating the subscription', err));
    }
  }

  render() {
    const {
      loading,
      loadingDatasets,
      sortedDatasets,
      alerts
    } = this.state;

    const { area } = this.props;

    return (
      <div className="c-area-subscription-modal" ref={(node) => { this.el = node; }}>
        <div className="header-div">
          <h2>{`${area.name} subscriptions`}</h2>
        </div>
        <div className="header-text">
          Select the datasets that you want to subscribe to.
        </div>

        <Spinner isLoading={loading || loadingDatasets} className="-light" />

        <div className="datasets-container">

          {!loadingDatasets && sortedDatasets && alerts.length > 0 &&
          <div className="c-subscription-selector">
            <div className="col col--dataset">
              <h5>Dataset</h5>
            </div>
            <div className="col col--type">
              <h5>Type</h5>
            </div>
            <div className="col col--threshhold">
              <h5>Minimum</h5>
            </div>
            <div className="col hidden"><h5>Actions</h5></div>
          </div>}

          {!loadingDatasets && sortedDatasets && alerts.map((alert, key) => (alert &&
            <SubscriptionSelector
              onChangeSubscription={(value, type, k) => this.onChangeSubscription(value, type, k)}
              onRemoveDataset={k => this.onRemoveDataset(k)}
              index={key}
              key={key}
              datasets={sortedDatasets}
              alert={alert}
            />
            ))}
        </div>

        <div className="new-container">
          <button
            className="c-btn -b -fullwidth"
            onClick={() => this.onAddAlert()}
          >Add dataset
          </button>
        </div>
        <div className="buttons">
          <button className="c-btn -primary" onClick={() => this.handleSubmit()}>
            Done
          </button>
          <button className="c-btn -secondary" onClick={() => this.props.onRequestClose()}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

AreaSubscriptionModal.propTypes = {
  alerts: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  locale: state.common.locale,
  alerts: areaAlerts(state)
});

export default connect(mapStateToProps, null)(AreaSubscriptionModal);
