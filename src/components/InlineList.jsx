export default function InlineList({ separator, children }) {
    const inlineUlCSS = {
        display: "inline",
        margin: 0,
        padding: 0,
        overflowWrap: "anywhere"
    };

    const inlineUlListItemCSS = {
        listStyleType: "none",
        margin: 0,
        padding: 0,
        display: "inline",
        textWrap: "nowrap"
    };

    return (
        <ul style={inlineUlCSS}>
            {
                children.flatMap((child, index) => {
                    const ret = index === 0 ? [] : [ separator ];
                    ret.push(<li key={index} style={inlineUlListItemCSS}>{child}</li>);
                    return ret;
                })
            }
        </ul>
    )
}