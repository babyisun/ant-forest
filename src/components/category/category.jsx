import React, { Component, Fragment } from 'react';
import { Anchor, Card, Button, Avatar, Icon } from 'antd';
import t from 'prop-types';
import './Category.scss';

const { Link } = Anchor;
const character = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'W',
  'X',
  'Y',
  'Z',
];
const arr = [];
const someSort = (arr) => {
  const segs = [];
  const letters = 'abcdefghjklmnopqrstwxyz'.split('');
  letters.forEach((item, i) => {
    const curr = { title: item.toUpperCase(), data: [] };
    arr.forEach((item1, i1) => {
      if (item === item1.name) {
        curr.data.push(item1.data);
      }
    });
    if (curr.data.length > 0) {
      segs.push(curr);
      curr.data.sort((a, b) => a.name.localeCompare(b.name));
    }
  });
  return segs;
};

class Category extends Component {
  state = {
    currIndex: '',
  };

  componentWillMount() {
    this.props.originArr.map((item) => {
      const tmp = item.letter;
      arr.push({ name: tmp, data: item });
    });
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
        {someSort(arr).map((ele, i) => (
          <div key={i}>
            <span
              key={i}
              id={ele.title}
              className={ele.title === this.state.currIndex ? 'active' : 'anchor-wrapper'}
            >
              {ele.title}
            </span>
            <div className="wrapper">
              {ele.data.map((elem, index) => (
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
