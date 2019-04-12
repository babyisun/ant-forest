import React, { Component, Fragment } from 'react';
import { Anchor, Card, Button, Avatar, Icon, Carousel } from 'antd';
import t from 'prop-types';
import './Category.scss';

const { Link } = Anchor;
let originArr;

let character = [],
  list = {};
const someSort = (arr1) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  originArr.forEach((item, i) => {
    if (letters.includes(item.letter)) {
      if (list[item.letter]) {
        list[item.letter].push(item);
      } else {
        list[item.letter] = [];
        list[item.letter].push(item);
      }
    } else {
      if (list['*']) {
        list['*'].push(item);
      } else {
        list['*'] = [];
        list['*'].push(item);
      }
    }
  });
  character = Object.keys(list);
  character = character.sort(function(s, t) {
    if (s < t) return -1;
    if (s > t) return 1;
    return 0;
  });
  if (character.includes('*')) {
    character.splice(0, 1);
    character.push('*');
  }
  return list;
};

let resolvedArr;
class Category extends Component {
  state = {
    currIndex: '',
  };

  componentWillMount() {
    originArr = this.props.originArr;
    resolvedArr = someSort(originArr);
  }

  componentDidMount() {
    const better_scroll = this.throttle(this.addActive, 100);
    if (this.props.container === window) {
      window.addEventListener('scroll', better_scroll, false);
    } else {
      const live = document.getElementById(this.props.container);
      live.style.height = '588px';
      live.style.overflow = 'scroll';
      live.addEventListener('scroll', better_scroll, false);
    }
  }

  componentWillUnmount() {
    const better_scroll = this.throttle(this.addActive, 100);
    if (this.props.container === window) {
      window.removeEventListener('scroll', better_scroll, false);
    } else {
      const live = document.getElementById(this.props.container);
      live.style.height = '588px';
      live.style.overflow = 'scroll';
      live.removeEventListener('scroll', better_scroll, false);
    }
  }

  handleClick = (e, link) => {
    e.preventDefault();
    this.setState({
      currIndex: link.title,
    });
  };

  addActive = () => {
    const activeId =
      document.getElementsByClassName('ant-anchor-link-active')[0] &&
      document.getElementsByClassName('ant-anchor-link-active')[0].innerText;
    this.setState({
      currIndex: activeId,
    });
  };

  // scroll防抖函数
  throttle = (fn, delay) => {
    let last = 0,
      timer = null;
    return function() {
      const context = this;
      const args = arguments;
      const now = +new Date();
      if (now - last < delay) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          last = now;
          fn.apply(context, args);
        }, delay);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };

  render() {
    return (
      <Card bordered={false} id="card">
        {character.map((ele, i) => (
          <div key={i}>
            <span
              key={i}
              id={ele}
              className={ele === this.state.currIndex ? 'active' : 'anchor-wrapper'}
            >
              {ele}
            </span>
            <div className="wrapper">
              {resolvedArr[ele].map((elem, index) => (
                <div className="item" key={index}>
                  <div className="avatar">
                    <Avatar size={45} icon="user" />
                    <span className="elem-name">{elem.name}</span>
                  </div>
                  <div className="item-footer" key={index}>
                    <span className="plugins">
                      {elem.plugins && (
                        <Fragment>
                          <i>|</i>
                          <Icon type="smile" theme="outlined" />
                        </Fragment>
                      )}
                      {elem.plugins}
                    </span>
                    <span className="job-number">
                      {elem.jobNumber && (
                        <Fragment>
                          <i>|</i>
                          <Icon type="setting" theme="filled" />
                        </Fragment>
                      )}
                      {elem.jobNumber}
                    </span>
                    <span className="browser">
                      {elem.browser && <Icon type="home" />}
                      {elem.browser}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="character">
          {
            <Anchor
              onClick={this.handleClick}
              getContainer={() =>
                this.props.container === window
                  ? window
                  : document.getElementById(this.props.container)
              }
            >
              {character.map((ele, i) => (
                <Link href={`#${ele}`} title={ele} className="anchor_link" key={i} />
              ))}
            </Anchor>
          }
        </div>
      </Card>
    );
  }
}
export default Category;
Category.propTypes = {
  /**
   * 数据格式Array，按示例将每个小卡片的数据放在一个对象里
   */
  originArr: t.array,
  /**
   * 指定容器，可以设置容器的id（String格式）或直接传入window（此时容器为body）
   */
  container: t.oneOf([String, window]),
};
Category.defaultProps = {
  originArr: Array,
  container: 'container',
};
