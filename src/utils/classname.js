const getPrefixCls = (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls)
        return `${customizePrefixCls}-${suffixCls}`;
    return `af-${suffixCls}`;
}

export { getPrefixCls };