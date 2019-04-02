import React, { Component } from 'react';
import { Radio, Checkbox, Card, Button } from 'antd';
import t from 'prop-types';
import './CategorySelector.scss';

class CategorySelector extends Component {
  renderCardTitle = () => {
    return (
      <div>
        <Button type="primary">全部</Button>
      </div>
    );
  };

  render() {
    return (
      <Card title={this.renderCardTitle()} bordered={false}>
        <div>111</div>
      </Card>
    );
  }
}
export default CategorySelector;
CategorySelector.propTypes = {
  multiple: t.oneOf([true, false]),
  object: t.oneOf([true, false]),
};
CategorySelector.defaultProps = {
  multiple: false,
  object: false,
};
