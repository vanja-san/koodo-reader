import { connect } from "react-redux";
import { handleOpenMenu, handleMenuMode } from "../../store/actions/viewArea";
import { stateType } from "../../store";
import { withNamespaces } from "react-i18next";
import PopupNote from "./component";
const mapStateToProps = (state: stateType) => {
  return {
    originalText: state.reader.originalText,
  };
};
const actionCreator = {
  handleOpenMenu,
  handleMenuMode,
};
export default connect(
  mapStateToProps,
  actionCreator
)(withNamespaces()(PopupNote as any));
