import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import store, {history} from './redux/store';
import { reduxConstants } from './redux/constants';

import OperatorHub from './pages/operatorHub/OperatorHub';
import ConfirmationModal from './components/modals/ConfirmationModal';
import asyncComponent from './common/AsyncComponent';
import { ConnectedRouter } from 'connected-react-router';

const OperatorPage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorPage" */ './pages/operatorPage/OperatorPage').then(module => module.default)
);
const OperatorPreviewPage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorPreviewPage" */ './pages/operatorPreviewPage/OperatorPreviewPage').then(
    module => module.default
  )
);
const GettingStarted = asyncComponent(() =>
  import(/* webpackChunkName: "GettingStarted" */ './pages/documentation/GettingStarted').then(module => module.default)
);
const WhatIsAnOperator = asyncComponent(() =>
  import(/* webpackChunkName: "WhatIsAnOperator" */ './pages/documentation/WhatIsAnOperator').then(
    module => module.default
  )
);
const Contribute = asyncComponent(() =>
  import(/* webpackChunkName: "Contribute" */ './pages/documentation/Contribute').then(module => module.default)
);
const HowToInstallOperators = asyncComponent(() =>
  import(/* webpackChunkName: "HowToInstallOperators" */ './pages/documentation/HowToInstallOperators').then(
    module => module.default
  )
);
const About = asyncComponent(() =>
  import(/* webpackChunkName: "About" */ './pages/documentation/About').then(module => module.default)
);

const OperatorBundlePage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorBundlePage" */ './pages/operatorBundlePage/OperatorBundlePage').then(
    module => module.default
  )
);
const OperatorYamlEditorPage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorYamlEditorPage" */ './pages/operatorBundlePage/OperatorYamlEditorPage').then(
    module => module.default
  )
);
const OperatorMetadataPage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorMetadataPage" */ './pages/operatorBundlePage/OperatorMetadataPage').then(
    module => module.default
  )
);
const OperatorDeploymentsPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorDeploymentsPage" */ './pages/operatorBundlePage/deployments/OperatorDeploymentsPage'
  ).then(module => module.default)
);
const OperatorInstallModesPage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorInstallModesPage" */ './pages/operatorBundlePage/OperatorInstallModesPage').then(
    module => module.default
  )
);
const OperatorOwnedCRDsPage = asyncComponent(() =>
  import(/* webpackChunkName: "OperatorOwnedCRDsPage" */ './pages/operatorBundlePage/crds/OperatorOwnedCRDsPage').then(
    module => module.default
  )
);
const OperatorRequiredCRDsPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorRequiredCRDsPage" */ './pages/operatorBundlePage/crds/OperatorRequiredCRDsPage'
  ).then(module => module.default)
);
const OperatorPermissionsPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorPermissionsPage" */ './pages/operatorBundlePage/permissions/OperatorPermissionsPage'
  ).then(module => module.default)
);
const OperatorClusterPermissionsPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorClusterPermissionsPage" */ './pages/operatorBundlePage/permissions/OperatorClusterPermissionsPage'
  ).then(module => module.default)
);
const OperatorOwnedCRDEditPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorOwnedCRDEditPage" */ './pages/operatorBundlePage/crds/OperatorOwnedCRDEditPage'
  ).then(module => module.default)
);
const OperatorDeploymentEditPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorDeploymentEditPage" */ './pages/operatorBundlePage/deployments/OperatorDeploymentEditPage'
  ).then(module => module.default)
);
const OperatorRequiredCRDEditPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorRequiredCRDEditPage" */ './pages/operatorBundlePage/crds/OperatorRequiredCRDEditPage'
  ).then(module => module.default)
);
const OperatorPermissionsEditPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorPermissionsEditPage" */ './pages/operatorBundlePage/permissions/OperatorPermissionsEditPage'
  ).then(module => module.default)
);
const OperatorClusterPermissionsEditPage = asyncComponent(() =>
  import(
    /* webpackChunkName: "OperatorClusterPermissionsEditPage" */ './pages/operatorBundlePage/permissions/OperatorClusterPermissionsEditPage'
  ).then(module => module.default)
);

const PackageEditorLandingPage = asyncComponent(() =>
  import(/* webpackChunkName: "PackageEditorLandingPage" */ './pages/packageEditor/PackageEditorLandingPage').then(
    module => module.default
  )
);

const PackageChannelsEditorPage = asyncComponent(() =>
  import(/* webpackChunkName: "PackageChannelsEditorPage" */ './pages/packageEditor/PackageChannelsEditor').then(
    module => module.default
  )
);

class App extends React.Component {
  static propTypes;

  constructor(props) {
    super(props);

    store.dispatch({
      type: reduxConstants.SET_URL_SEARCH_STRING,
      urlSearchString: props.location.search
    });
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Switch>
            <Route path="/operator/:packageName/:channel/:operatorId" component={OperatorPage} />
            <Route path="/operator/:channel/:operatorId" component={OperatorPage} />
            <Route path="/operator/:packageName" component={OperatorPage} />
            <Route path="/preview" component={OperatorPreviewPage} />

            <Route path="/packages/:packageName/:channelName/:operatorVersion/metadata" component={OperatorMetadataPage} />            
            <Route path="/packages/:packageName/:channelName/:operatorVersion/owned-crds/add" render={props => <OperatorOwnedCRDEditPage {...props} isNew />} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/owned-crds/edit/:index/:crd?" component={OperatorOwnedCRDEditPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/owned-crds" component={OperatorOwnedCRDsPage} />
            <Route
              path="/packages/:packageName/:channelName/:operatorVersion/required-crds/add"
              render={props => <OperatorRequiredCRDEditPage {...props} isNew />}
            />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/required-crds/edit/:index/:crd?" component={OperatorRequiredCRDEditPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/required-crds" component={OperatorRequiredCRDsPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/deployments/add" render={props => <OperatorDeploymentEditPage {...props} isNew />} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/deployments/edit/:index/:deployment?" component={OperatorDeploymentEditPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/deployments" component={OperatorDeploymentsPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/permissions/add" render={props => <OperatorPermissionsEditPage {...props} isNew />} />
            <Route
              path="/packages/:packageName/:channelName/:operatorVersion/permissions/edit/:index/:serviceAccountName?"
              component={OperatorPermissionsEditPage}
            />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/permissions" component={OperatorPermissionsPage} />
            
            <Route
              path="/packages/:packageName/:channelName/:operatorVersion/cluster-permissions/add"
              render={props => <OperatorClusterPermissionsEditPage {...props} isNew />}
            />
            <Route
              path="/packages/:packageName/:channelName/:operatorVersion/cluster-permissions/edit/:index/:serviceAccountName?"
              component={OperatorClusterPermissionsEditPage}
            />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/cluster-permissions" component={OperatorClusterPermissionsPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/install-modes" component={OperatorInstallModesPage} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion/yaml" component={OperatorYamlEditorPage} />

            <Route path="/packages/:packageName/:channelName/:operatorVersion/new" render={props => <OperatorBundlePage {...props} isNew />} />
            <Route path="/packages/:packageName/:channelName/:operatorVersion" component={OperatorBundlePage} />

            <Route path="/packages/:packageName" component={PackageChannelsEditorPage} />
            <Route path="/packages" exact component={PackageEditorLandingPage} />
            

            <Route path="/getting-started" component={GettingStarted} />
            <Route path="/what-is-an-operator" component={WhatIsAnOperator} />
            <Route path="/contribute" component={Contribute} />
            <Route path="/how-to-install-an-operator" component={HowToInstallOperators} />
            <Route path="/about" component={About} />
            <Route path="/" component={OperatorHub} />
            <Redirect from="*" to="/" key="default-route" />
          </Switch>
          <ConfirmationModal key="confirmationModal" />
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(App);
