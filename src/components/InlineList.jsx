export default function InlineList({ separator, children }) {
    const inlineUlCSS = {
        display: "inline",
        margin: 0,
        padding: 0
    };

    return (
        <ul className="inlineUl" style={inlineUlCSS}>
            <style>
            {`
                .inlineUl li {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    display: inline;
                }

                .inlineUl li:not(:last-child)::after {
                    content: "${separator || " "}";
                }
            `}
            </style>
            {
                children.map((child, index) => (
                    <li key={index}>{child}</li>
                ))
            }
        </ul>
    )
}