import React, { Component, PropTypes } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class EditorFooter extends Component {
  _renderPlayIcon () {
    const { isPlaying } = this.props

    const icon = isPlaying ? 'pause' : 'play'

    return (
      <Icon name={ icon } />
    )
  }

  _renderToggleButton () {
    return this.props.hideSidebarToggle ? null
      : (
        <Button
          basic
          icon
          className="c-editor__footer-sidebar c-editor__toolbar-publish"
          onClick={() => this.props.toggleSidebar()}
        >
          <Icon name="content" />
        </Button>
      )
  }

  render () {
    const { title, onSlideBack, onSlideForward, togglePlay, currentSlideIndex, totalSlideCount } = this.props
    return (
      <div className="c-editor__footer">
        { this._renderToggleButton() }
        <span className="c-editor__footer-controls">
          <Button
            basic
            icon
            className="c-editor__toolbar-publish"
            onClick={() => onSlideBack()}
            disabled={ currentSlideIndex === 0 }
          >
            <Icon name="step backward" />
          </Button>
          <Button
            basic
            icon
            className="c-editor__toolbar-publish"
            onClick={() => togglePlay()}
          >
            { this._renderPlayIcon() }
          </Button>
          <Button
            basic
            icon
            className="c-editor__toolbar-publish"
            onClick={() => onSlideForward()}
            disabled={ currentSlideIndex + 1 === totalSlideCount }
          >
            <Icon name="step forward" />
          </Button>
        </span>
        <a
          className="c-editor__footer-wiki c-editor__footer-sidebar c-editor__toolbar-publish c-app-footer__link "
          href={ `https://en.wikipedia.org/wiki/${title}` }
          target="_blank"
        >
          <Icon name="wikipedia" />
        </a>
      </div>
    )
  }
}

EditorFooter.propTypes = {
  currentSlideIndex: PropTypes.number.isRequired,
  totalSlideCount: PropTypes.number.isRequired,
  onSlideBack: PropTypes.func.isRequired,
  onSlideForward: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  hideSidebarToggle: PropTypes.bool.isRequired,
}
