//图书导航栏页面的书签，笔记，书摘页面
import React from "react";
import "./navList.css";
import { Trans } from "react-i18next";
import { NavListProps, NavListState } from "./interface";
import DeleteIcon from "../deleteIcon";
class NavList extends React.Component<NavListProps, NavListState> {
  constructor(props: NavListProps) {
    super(props);
    this.state = {
      deleteIndex: -1,
    };
  }
  //跳转到图书的指定位置
  handleJump(cfi: string) {
    if (!cfi) {
      this.props.handleMessage("Wrong bookmark");
      this.props.handleMessageBox(true);
      return;
    }
    this.props.currentEpub.rendition.display(cfi);
  }
  handleShowDelete = (index: number) => {
    this.setState({ deleteIndex: index });
  };
  render() {
    let currentData: any = ((this.props.currentTab === "bookmarks"
      ? this.props.bookmarks
      : this.props.currentTab === "notes"
      ? this.props.notes.filter((item) => item.notes !== "")
      : this.props.digests) as any).filter((item: any) => {
      return item.bookKey === this.props.currentBook.key;
    });
    const renderBookNavList = () => {
      return currentData.reverse().map((item: any, index: number) => {
        const bookmarkProps = {
          itemKey: item.key,
          mode: this.props.currentTab === "bookmarks" ? "bookmarks" : "notes",
        };
        return (
          <li
            className="book-bookmark-list"
            key={item.key}
            onMouseEnter={() => {
              this.handleShowDelete(index);
            }}
            onMouseLeave={() => {
              this.handleShowDelete(-1);
            }}
          >
            <p className="book-bookmark-digest">
              {this.props.currentTab === "bookmarks"
                ? item.label
                : this.props.currentTab === "notes"
                ? item.notes
                : item.text}
            </p>
            <span className="bookmark-page-list-item-title">
              <Trans>{item.chapter}</Trans>
            </span>
            {this.state.deleteIndex === index ? (
              <DeleteIcon {...bookmarkProps} />
            ) : null}
            <div
              className="book-bookmark-link"
              onClick={() => {
                this.handleJump(item.cfi);
              }}
              style={{ cursor: "pointer" }}
            >
              <Trans>Go To</Trans>
            </div>
            <div className="book-bookmark-progress">
              {Math.floor(item.percentage * 100)}%
            </div>
          </li>
        );
      });
    };
    if (!currentData[0]) {
      return (
        <div className="navigation-panel-empty-bookmark">
          <Trans>Empty</Trans>
        </div>
      );
    }
    return (
      <div className="book-bookmark-container">
        <ul className="book-bookmark">{renderBookNavList()}</ul>
      </div>
    );
  }
}

export default NavList;
