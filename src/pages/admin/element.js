function Element({ TagName, children, data, ...obj }) {
    console.log('a', children)
    return (
        <TagName {...obj}>{children}{data}</TagName>
    );
}

export default Element;