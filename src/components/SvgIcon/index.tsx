/**
 * 浮动按钮， 提供扩展菜单功能
 * 目前只支持一层
 *
 * @format
 */

import * as React from 'react'
import {CSSProperties} from 'react'
import './index.less'

interface IProps {
  readonly icon: string
  readonly style?: CSSProperties
  /** 图片尺寸 */
  readonly size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  /** 点击按钮，回调事件 */
  readonly onClick?: () => void
}

export default class AppointItemList extends React.Component<IProps> {
  static defaultProps = {
    icon: '',
    size: 'md',
  }

  render() {
    return (
      <svg className={'svg-icon svg-icon-' + this.props.size} style={this.props.style} aria-hidden="true">
        <use xlinkHref={'#icon-' + this.props.icon} />
      </svg>
    )
  }
}
