import React from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import FormNav from '../components/FormNav';
import FormTitle from '../components/FormTitle';
import AskVAQuestions from '../components/AskVAQuestions';

const Element = Scroll.Element;

/*
 * Primary component for a schema generated form app.
 */
class FormApp extends React.Component {
  componentWillMount() {
    if (window.History) {
      window.History.scrollRestoration = 'manual';
    }
  }

  render() {
    const { currentLocation, formConfig, children, formData } = this.props;
    const trimmedPathname = currentLocation.pathname.replace(/\/$/, '');
    const isIntroductionPage = trimmedPathname.endsWith('introduction');
    const isConfirmationPage = trimmedPathname.endsWith('confirmation');
    const GetFormHelp = formConfig.getHelp;
    const saveEnabled = !formConfig.disableSave;

    let formTitle;
    let formNav;
    let renderedChildren = children;
    if (!isIntroductionPage) {
      // Show nav only if we're not on the intro or confirmation page
      if (!isConfirmationPage) {
        formNav = <FormNav formData={formData} formConfig={formConfig} currentPath={trimmedPathname}/>;
      }
      // Show title only if we're not on the intro page and if there is a title
      // specified in the form config
      if (formConfig.title) {
        formTitle = <FormTitle title={formConfig.title} subTitle={formConfig.subTitle}/>;
      }

      renderedChildren = (
        <div className="progress-box progress-box-schemaform">
          {children}
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="usa-width-two-thirds medium-8 columns">
            <Element name="topScrollElement"/>
            {formTitle}
            {formNav}
            {renderedChildren}
          </div>
        </div>
        {!isConfirmationPage && <AskVAQuestions>
          {!!GetFormHelp && <GetFormHelp/>}
        </AskVAQuestions>}
        <span className="js-test-location hidden" data-location={trimmedPathname} hidden></span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formData: state.form.data
});

export default connect(mapStateToProps)(FormApp);

export { FormApp };
