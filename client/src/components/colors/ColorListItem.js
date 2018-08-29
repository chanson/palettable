// @flow
import styles from './ColorListItem.scss';
import React from 'react';
import HexCodeInput from './tools/HexCodeInput';
import ColorListItemFooter from './ColorListItemFooter';
import AdjustColorTool from './tools/AdjustColorTool';
import RemoveColorTool from './tools/RemoveColorTool';
import { MoonLoader } from 'halogen';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import type { ReduxStore, ColorType } from '../../constants/FlowTypes';
import connectInterfaceColorScheme from '../decorators/connectInterfaceColorScheme';

type Props = {
  color: ColorType,
  isFetching: boolean,
  isLastItem: boolean,
  accentHexCode: string,
  isDark: boolean,
};

class ColorListItem extends React.Component<Props> {
  renderLoader() {
    const { accentHexCode } = this.props;

    return (
      <CSSTransition
        key="loader"
        timeout={400}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
      >
        <div className={styles.loaderContainer}>
          <MoonLoader color={accentHexCode.color} />
        </div>
      </CSSTransition>
    );
  }
  renderTools() {
    const { color } = this.props;
    return (
      <CSSTransition
        key="tools"
        timeout={200}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
      >
        <div>
          <HexCodeInput color={color} />
          <div className={styles.toolIcons}>
            <AdjustColorTool color={color} />
            <RemoveColorTool color={color} />
          </div>
        </div>
      </CSSTransition>
    );
  }

  renderContent() {
    const { isFetching, isLastItem } = this.props;

    if (isFetching && isLastItem) {
      return this.renderLoader();
    }

    return this.renderTools();
  }
  render() {
    const { color, isLastItem } = this.props;
    const style = {
      backgroundColor: color.hexCode,
    };

    return (
      <div className={styles.colorListItem}>
        <div style={style} className={styles.colorListItemBackground}>
          <TransitionGroup>{this.renderContent()}</TransitionGroup>
          <div className={styles.footer}>
            <ColorListItemFooter active={isLastItem} color={color} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxStore) => {
  return {
    isFetching: state.dataStatus.isFetching,
  };
};

export default connect(mapStateToProps)(
  connectInterfaceColorScheme(ColorListItem)
);
