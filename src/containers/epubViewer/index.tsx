import {
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchChapters,
} from "../../store/actions/reader";
import { handleFetchPercentage } from "../../store/actions/progressPanel";
import {
  handleMessageBox,
  handleFetchBooks,
} from "../../store/actions/manager";
import "./epubViewer.css";
import { connect } from "react-redux";
import { stateType } from "../../store";
import Reader from "./component";
import { withNamespaces } from "react-i18next";

const mapStateToProps = (state: stateType) => {
  return {
    currentEpub: state.book.currentEpub,
    currentBook: state.book.currentBook,
    isMessage: state.manager.isMessage,
  };
};
const actionCreator = {
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchChapters,
  handleMessageBox,
  handleFetchPercentage,
  handleFetchBooks,
};
export default connect(
  mapStateToProps,
  actionCreator
)(withNamespaces()(Reader as any));
